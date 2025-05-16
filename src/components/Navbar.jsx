import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import axios from 'axios';

const Navbar = () => {
 

  return (
    <nav className="signup-navbar">
      <div className="navbar-div signup-navbar-logo">ChittyPro</div>
      <ul className="signup-navbar-links">
        <li>
          <Link to="/"><i className="fas fa-home"></i> Home</Link>
        </li>
        <li>
          <Link to="/chittyhome"><i className="fas fa-calculator"></i> Chitty Plans</Link>
        </li>
        <li>
          <Link to="/feedback"><i className="fas fa-comment-alt"></i> Feedback</Link>
        </li>
        {/* <li>
          <Link to="/notify">
            <i className="fas fa-bell">
              
            </i> 
            Notification
          </Link>
        </li> */}
        <li>
          <Link to="/profilepage"><i className="fas fa-user"></i> Profile</Link>
        </li>
        <li>
          <Link to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
