import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../../api/authApi";

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 16;

function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    dateOfBirth: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    userEmail: "",
    dateOfBirth: "",
    password: "",
    general: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password" && value.length > MAX_PASSWORD_LENGTH) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {
      userName: "",
      userEmail: "",
      dateOfBirth: "",
      password: "",
      general: "",
    };

    let valid = true;

    if (!formData.userName.trim()) {
      newErrors.userName = "Name is required.";
      valid = false;
    }

    if (!formData.userEmail.trim()) {
      newErrors.userEmail = "Email is required.";
      valid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
      valid = false;
    } else if (formData.dateOfBirth >= today) {
      newErrors.dateOfBirth =
        "Date of birth must be earlier than today's date.";
      valid = false;
    }

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
      valid = false;
    }

    if (formData.password.length > MAX_PASSWORD_LENGTH) {
      newErrors.password = `Password cannot exceed ${MAX_PASSWORD_LENGTH} characters.`;
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!validateForm()) return;

    setLoading(true);

    try {
      await registerUser(formData);

      navigate("/verify-otp", {
        state: {
          userEmail: formData.userEmail,
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Registration failed.";

      if (
        message.toLowerCase().includes("email") &&
        message.toLowerCase().includes("exist")
      ) {
        setErrors((prev) => ({
          ...prev,
          userEmail: "This email already exists.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: message,
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {errors.general && (
        <p className="error-message">{errors.general}</p>
      )}

      <div className="input-group">
        <input
          type="text"
          name="userName"
          placeholder="Your name"
          value={formData.userName}
          onChange={handleChange}
        />
        {errors.userName && (
          <span className="field-error">{errors.userName}</span>
        )}
      </div>

      <div className="input-group">
        <input
          type="email"
          name="userEmail"
          placeholder="Email address"
          value={formData.userEmail}
          onChange={handleChange}
        />
        {errors.userEmail && (
          <span className="field-error">{errors.userEmail}</span>
        )}
      </div>

      <div className="input-group">
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          max={new Date(Date.now() - 86400000).toISOString().split("T")[0]}
        />
        {errors.dateOfBirth && (
          <span className="field-error">{errors.dateOfBirth}</span>
        )}
      </div>

      <div className="input-group">
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            maxLength={MAX_PASSWORD_LENGTH}
          />

          <span
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {errors.password && (
          <span className="field-error">{errors.password}</span>
        )}
      </div>

      <p className="password-hint">
        Password must be between <strong>6 and 16 characters</strong>.
      </p>

      <button type="submit" disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}

export default RegisterForm;