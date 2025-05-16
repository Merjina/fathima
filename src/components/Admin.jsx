import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/count");
        setTotalUsers(response.data);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul>
          <li onClick={() => navigate("/admin")}>Dashboard</li>
          <li onClick={() => navigate("/chittyscheme")}>Chitty Scheme Management</li>
          <li onClick={() => navigate("/user")}>Member Management</li>
          <li onClick={() => navigate("/loan")}>Loan Request</li>
          <li onClick={() => navigate("/auction")}>Auction Management</li>
          <li onClick={() => navigate("/branch")}>Branch Management</li>
          <li onClick={() => navigate("/loanpay")}>Loan Pay</li>
       
          <li onClick={() => navigate("/feedbacklist")}>Feedback</li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Welcome To Admin Dashboard</h1>
        </header>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
          <div className="card">
            <h3>Active Chitty Plans</h3>
            <p>8</p>
          </div>
          <div className="card">
            <h3>Total Transactions</h3>
            <p>₹ 2,50,000</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
