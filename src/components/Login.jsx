import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(""); // Email or Phone
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null); // Use 'alert' for error messages

  const validateForm = () => {
    if (!identifier) {
      setAlert({ message: "⚠️ Email or Phone is required!", type: "danger" });
      return false;
    }
    if (!password) {
      setAlert({ message: "⚠️ Password is required!", type: "danger" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Ensure form validation

    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        identifier,
        password,
      });

      const { token, role } = response.data;

      // Store JWT token in localStorage
      localStorage.setItem("token", token);

      // Check the role to navigate to the appropriate page
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setAlert({ message: "⚠️ Invalid email or password.", type: "danger" });
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-box">
        <h1 className="login-header text-center">LOGIN</h1>

        {/* Alert */}
        {alert && (
          <div className={`alert alert-${alert.type} text-center`}>
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email or Phone */}
          <div className="mb-3">
            <label className="login-label form-label">Email or Phone</label>
            <div className="input-group">
              <span className="login-span input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email or Phone"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="login-span input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-button btn btn-success w-50 mb-3"
            style={{ borderRadius: 15 }}
          >
            <i className="bi bi-box-arrow-in-right"></i> Login
          </button>

          {/* Links */}
          <div className="text-center">
            Not registered? <a href="/signup">Create an account</a>
            <p className="mt-3">
              <a href="/forgot">Forgot password?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;