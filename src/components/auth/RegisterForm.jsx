import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../../api/authApi";

function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    dateOfBirth: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      console.log("Registration successful", response);

      navigate("/verify-otp", {
        state: {
          userEmail: formData.userEmail,
        },
      });
    } catch (error) {
      console.error("Registration failed", error);
      alert(error.response?.data || "Registration failed.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="userName"
        placeholder="Your name"
        value={formData.userName}
        onChange={handleChange}
      />

      <input
        type="email"
        name="userEmail"
        placeholder="Email address"
        value={formData.userEmail}
        onChange={handleChange}
      />

      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />

      <div className="password-field">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <span
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button type="submit">Create Account</button>
    </form>
  );
}

export default RegisterForm;