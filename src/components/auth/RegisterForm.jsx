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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent typing beyond max password length
    if (name === "password" && value.length > MAX_PASSWORD_LENGTH) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const passwordLength = formData.password.length;

    if (passwordLength < MIN_PASSWORD_LENGTH) {
      alert(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
      return;
    }

    if (passwordLength > MAX_PASSWORD_LENGTH) {
      alert(
        `Password is too long. Maximum length is ${MAX_PASSWORD_LENGTH} characters.`
      );
      return;
    }

    setLoading(true);

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
      alert("Registration failed");
    } finally {
      setLoading(false);
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
        required
      />

      <input
        type="email"
        name="userEmail"
        placeholder="Email address"
        value={formData.userEmail}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
      />

      <div className="password-field">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          minLength={MIN_PASSWORD_LENGTH}
          maxLength={MAX_PASSWORD_LENGTH}
          required
        />

        <span
          className="password-toggle"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
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