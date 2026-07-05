import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";

function RegisterForm() {

  const navigate = useNavigate();

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

  console.log("Submitting registration...");

  try {
    const response = await registerUser(formData);

    console.log("Registration successful", response);

    navigate("/verify-otp", {
      state: {
        userEmail: formData.userEmail,
      },
    });

  } catch (error) {
    console.log("emailalready exists")
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
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">
        Create Account
      </button>

    </form>
  );
}

export default RegisterForm;