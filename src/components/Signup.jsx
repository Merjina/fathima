import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import Navbar from "./Navbar";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  const validateForm = () => {
    if (!name) return setAlert({ message: "⚠️ Username is required!", type: "danger" }), false;
    if (!email) return setAlert({ message: "⚠️ Email is required!", type: "danger" }), false;
    if (!/\S+@\S+\.\S+/.test(email)) return setAlert({ message: "⚠️ Invalid email format!", type: "danger" }), false;
    if (!phone) return setAlert({ message: "⚠️ Mobile number is required!", type: "danger" }), false;
    if (!/^\d{10}$/.test(phone)) return setAlert({ message: "⚠️ Mobile number must be 10 digits!", type: "danger" }), false;
    if (!password) return setAlert({ message: "⚠️ Password is required!", type: "danger" }), false;
    if (password.length < 6) return setAlert({ message: "⚠️ Password must be at least 6 characters!", type: "danger" }), false;
    if (password !== confirmPassword) return setAlert({ message: "⚠️ Passwords do not match!", type: "danger" }), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        phone,
        password
      });

      setAlert({ message: "✅ Signup successful!", type: "success" });
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || "❌ Signup failed!",
        type: "danger",
      });
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="login-container d-flex justify-content-center align-items-center">
        <div className="login-box">
          <h1 className="login-header text-center">SIGN UP</h1>

          {alert.message && (
            <div className={`alert alert-${alert.type} text-center`} role="alert">
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-2">
              <label htmlFor="name" className="login-label form-label">Name</label>
              <div className="input-group">
                <span className="login-span input-group-text"><i className="bi bi-person"></i></span>
                <input type="text" className="form-control" id="username" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            {/* Email */}
            <div className="mb-2">
              <label htmlFor="email" className="login-label form-label">Email Address</label>
              <div className="input-group">
                <span className="login-span input-group-text"><i className="bi bi-envelope"></i></span>
                <input type="email" className="form-control" id="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-2">
              <label htmlFor="phone" className="login-label form-label">Phone</label>
              <div className="input-group">
                <span className="login-span input-group-text"><i className="bi bi-phone"></i></span>
                <input type="tel" className="form-control" id="mobile" placeholder="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            {/* Password */}
            <div className="mb-2">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <span className="login-span input-group-text"><i className="bi bi-lock"></i></span>
                <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-2">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-group">
                <span className="login-span input-group-text"><i className="bi bi-lock"></i></span>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>

            <button type="submit" className="login-button btn btn-success w-50 mb-2" style={{ borderRadius: 15 }}>
              <i className="bi bi-lock"></i> Sign Up
            </button>

            <br />
            Already registered? <a href="/">Login Here</a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
