import { useEffect, useState } from "react";
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
  const [message, setMessage] = useState("");

  /**
   * Redirect if page is opened directly
   */
  useEffect(() => {
    if (!userEmail) {
      navigate("/register");
    }
  }, [userEmail, navigate]);

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
   * Hide success message automatically
   */
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  /**
   * Format MM:SS
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
   * OTP input handler
   */
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);
  };

  /**
   * Verify OTP
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otpExpired) return;

    try {
      await verifyOtp({
        userEmail,
        otp: Number(otp.join("")),
      });

      alert("OTP verified successfully.");

      navigate("/login");
    } catch (error) {
      alert(
          "OTP verification failed."
      );
    }
  };

  /**
   * Choose Different Email
   */
  const handleChooseDifferentEmail = async () => {
    try {
      await deletePendingRegistration(userEmail);
    } catch (error) {
      console.error(error);
    }

    navigate("/register");
  };

  /**
   * Resend OTP
   */
  const handleResendOtp = async () => {
    try {
      setLoading(true);

      await resendOtp(userEmail);

      setOtp(["", "", "", ""]);
      setTimeLeft(OTP_DURATION);
      setOtpExpired(false);

      setMessage(
        "A new verification code has been sent to your email."
      );
    } catch (error) {
      alert(
        error.response?.data ||
          "Unable to resend OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {/* Timer */}

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

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}
      </div>

      {/* OTP Boxes */}

      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="otp-input"
            value={digit}
            onChange={(e) =>
              handleChange(index, e.target.value)
            }
          />
        ))}
      </div>

      {/* Verify Button */}

      <button
        type="submit"
        disabled={otpExpired}
      >
        Verify OTP
      </button>

      {/* Resend Section */}

      <div className="resend-section">
        <p className="resend-text">
          Didn't receive the verification email?
        </p>

        {otpExpired ? (
          <>
            <p className="otp-help-text">
              Check your Spam folder or make sure you entered a
              valid email address.
            </p>

            <span
              className="active-link"
              onClick={handleResendOtp}
            >
              {loading ? "Sending..." : "Resend OTP"}
            </span>

            <span
              className="change-email-link"
              onClick={handleChooseDifferentEmail}
            >
              Choose Different Email
            </span>
          </>
        ) : (
          <span className="disabled-link">
            Resend OTP
          </span>
        )}
      </div>
    </form>
  );
}

export default OtpForm;