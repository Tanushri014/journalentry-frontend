import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { verifyOtp } from "../../api/authApi";
function OtpForm() {

  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = location.state?.userEmail;

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
console.log("sending otp")
      await verifyOtp({
        userEmail,
        otp: Number(otp.join("")),
      });

      alert("OTP Verified Successfully!");

      navigate("/login");

    } catch (error) {

      alert(error.response?.data || "OTP verification failed.");

    }

  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>

      <div className="otp-container">

        {otp.map((digit, index) => (
          <input
            key={index}
            className="otp-input"
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}

      </div>

      <button type="submit">
        Verify OTP
      </button>

      <p className="resend-text">
        Didn't receive the code?
        <span> Resend OTP</span>
      </p>

    </form>
  );
}

export default OtpForm;