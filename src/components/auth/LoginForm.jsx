import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../../api/authApi";

function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userEmail: "",
    password: "",
    general: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

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
    const newErrors = {
      userEmail: "",
      password: "",
      general: "",
    };

    let isValid = true;

    if (!formData.userEmail.trim()) {
      newErrors.userEmail = "Email is required.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid email or password.";

      setErrors((prev) => ({
        ...prev,
        general: message,
      }));
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
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {errors.password && (
          <span className="field-error">{errors.password}</span>
        )}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;