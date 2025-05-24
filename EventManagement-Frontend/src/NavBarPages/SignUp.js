import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../NavBarPagesCss/SignUp.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8084/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          alert("✅ Sign-up successful!");
          navigate("/login");
        } else {
          alert("❌ Signup failed. Try again.");
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        alert("⚠️ Error occurred during signup");
      });
  };

  return (
    <div className="signup-page d-flex align-items-center justify-content-center min-vh-100 bg-gradient">
      <div className="signup-form-box p-5 shadow-lg rounded bg-white animate__animated animate__fadeInUp">
        <h2 className="text-center mb-4 text-color-purple">Create an Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="form-control mb-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            className="form-control mb-3"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="form-control mb-3"
          />
          <select
            name="role"
            required
            onChange={handleChange}
            className="form-control mb-4"
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="ORGANIZER">Organizer</option>
            <option value="ATTENDEE">Attendee</option>
          </select>
          <button type="submit" className="btn btn-purple w-100">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3" >
          Already have an account? <Link to="/login" style={{ color: "purple" }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
