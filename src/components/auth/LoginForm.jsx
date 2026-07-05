import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/authApi";

function LoginForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userEmail: "",
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

      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");

    } catch (error) {

      alert(error.response?.data || "Login failed.");

    }

  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>

      <input
        type="email"
        name="userEmail"
        placeholder="Email address"
        value={formData.userEmail}
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
        Login
      </button>

    </form>
  );
}

export default LoginForm;