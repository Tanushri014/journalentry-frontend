```jsx
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyOtp,
  resendOtp,
  deletePendingRegistration,
} from "../../api/authApi";

function OtpForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = location.state?.userEmail;

  const OTP_DURATION = 120;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(OTP_DURATION);
  const [otpExpired, setOtpExpired] = useState(false);

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  /**
   * Redirect if page is opened directly
   */
  useEffect(() => {
    if (!userEmail) {
      navigate("/register");
    }
  }, [userEmail, navigate]);

  /**
   * Focus first OTP box
   */
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /**
   * OTP Countdown Timer
   */
  useEffect(() => {
    if (otpExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setOtpExpired(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [otpExpired]);

  /**
   * Hide success/error messages automatically
   */
  useEffect(() => {
    if (!message && !error) return;

    const timer = setTimeout(() => {
      setMessage("");
      setError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, error]);

  /**
   * Format timer
   */
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  /**
   * OTP Input Change
   */
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Backspace Navigation
   */
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  /**
   * Paste OTP
   */
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otp.length);

    if (!pastedData) return;

    const updatedOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);

    const nextIndex =
      pastedData.length === otp.length
        ? otp.length - 1
        : pastedData.length;

    inputRefs.current[nextIndex]?.focus();
  };

  /**
   * Verify OTP
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otpExpired || verifying) return;

    if (otp.includes("")) {
      setError("Please enter the complete OTP.");
      return;
    }

    try {
      setVerifying(true);
      setError("");

      await verifyOtp({
        userEmail,
        otp: Number(otp.join("")),
      });

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid or expired OTP. Please try again."
      );
    } finally {
      setVerifying(false);
    }
  };

  /**
   * Choose Different Email
   */
  const handleChooseDifferentEmail = async () => {
    try {
      await deletePendingRegistration(userEmail);
    } catch (err) {
      console.error(err);
    }

    navigate("/register");
  };

  /**
   * Resend OTP
   */
  const handleResendOtp = async () => {
    if (loading || !otpExpired) return;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await resendOtp(userEmail);

      setOtp(["", "", "", ""]);
      setTimeLeft(OTP_DURATION);
      setOtpExpired(false);

      setMessage("A new verification code has been sent to your email.");

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to resend OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="otp-timer">
        {otpExpired ? (
          <span className="otp-expired">
            Your verification code has expired.
          </span>
        ) : (
          <span>
            Expires in <strong>{formatTime()}</strong>
          </span>
        )}
      </div>

      {message && <p className="success-message">{message}</p>}

      {error && <p className="error-message">{error}</p>}

      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            className="otp-input"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={otpExpired || verifying}
      >
        {verifying ? "Verifying..." : "Verify OTP"}
      </button>

      <div className="resend-section">
        <p className="resend-text">
          Didn't receive the verification email?
        </p>

        {otpExpired ? (
          <>
            <p className="otp-help-text">
              Check your Spam folder or make sure you entered a valid email
              address.
            </p>

            <span
              className={loading ? "disabled-link" : "active-link"}
              onClick={!loading ? handleResendOtp : undefined}
            >
              {loading ? "Sending..." : "Resend OTP"}
            </span>

            <br />

            <span
              className="change-email-link"
              onClick={handleChooseDifferentEmail}
            >
              Choose Different Email
            </span>
          </>
        ) : (
          <span className="disabled-link">
            Resend OTP ({formatTime()})
          </span>
        )}
      </div>
    </form>
  );
}

export default OtpForm;
```
