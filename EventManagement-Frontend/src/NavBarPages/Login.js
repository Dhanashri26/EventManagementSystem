import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../NavBarPagesCss/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:8084/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user && user.role) {
          if (user.role === "ADMIN") {
            navigate("/admin-dashboard");
          } else if (user.role === "ORGANIZER") {
            navigate("/organizer-dashboard");
          } else if (user.role === "ATTENDEE") {
            navigate("/attendee-dashboard");
          }
        } else {
          setError("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError("Something went wrong");
      });
  };

  return (
    <div className="login-page-container">
      <div className="login-card animated fadeIn">
        <h2 className="text-center mb-4">Welcome Back 👋</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="signup-text">
          Not registered? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
