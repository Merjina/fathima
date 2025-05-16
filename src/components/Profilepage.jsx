import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profilepage.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    // Fetch profile data from the backend
    axios
      .get("http://localhost:8081/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,  // Include token in the Authorization header
        },
      })
      .then((res) => {
        setProfile(res.data);  // Set the profile data received from the backend
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile: " + err.message);
      });
  }, []);

  if (error) {
    return <p>{error}</p>;  // Display error message if there is any error
  }

  if (!profile) {
    return <p>Loading...</p>;  // Display loading message if profile is not yet loaded
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-avatar">
          <span>👤</span>
        </div>
        <h2>My Profile</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        {/* <p><strong>Mobile:</strong> {profile.mobile}</p>
        <p><strong>Role:</strong> {profile.role}</p> */}
        <button className="back-btn" onClick={() => navigate("/home")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Profile;