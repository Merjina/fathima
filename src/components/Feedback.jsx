import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Feedback.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChittySchemes();
    fetchUserProfile();
  }, []);

  const fetchChittySchemes = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/chitty/all");
      setSchemes(res.data);
    } catch (err) {
      console.error("Error fetching chitty schemes:", err);
      setError("Failed to fetch schemes. Please try again later.");
    }
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8081/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserProfile(res.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to fetch user profile.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback || !rating || !selectedSchemeId || !userProfile?.id) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/api/feedback/submit", {
        userId: userProfile.id,
        chittyId: selectedSchemeId,
        rating,
        comment: feedback,
      });

      console.log("Feedback submitted:", res.data);
      setSubmitted(true);
      setError("");
    } catch (err) {
      console.error("Feedback submission error:", err);
      setError("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="feedback-wrapper">
      <div className="feedback-header">
        <h2>Feedback</h2>
      </div>

      <div className="feedback-container">
        {userProfile && (
          <p className="user-info">
            Name: {userProfile.name} (ID: {userProfile.id}) (Email: {userProfile.email})
          </p>
        )}

        {!submitted ? (
          <form className="feedback-form" onSubmit={handleSubmit}>
            {error && <p className="feedback-error">{error}</p>}

            <div className="star-rating">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={30}
                  className={index < rating ? "filled" : "empty"}
                  onClick={() => setRating(index + 1)}
                />
              ))}
            </div>

            <textarea
              className="feedback-textarea"
              rows="4"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>

            <div className="form-group">
              <label>Select Chitty Scheme</label>
              <select
                value={selectedSchemeId}
                onChange={(e) => setSelectedSchemeId(e.target.value)}
                required
              >
                <option value="">-- Choose a Scheme --</option>
                {schemes.map((scheme) => (
                  <option key={scheme.id} value={scheme.id}>
                    {scheme.schemeName}
                  </option>
                ))}
              </select>
            </div>

            <div className="button-row">
              <button type="submit" className="feedback-button">
                Submit
              </button>

              <button
                type="button"
                className="back-button"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </form>
        ) : (
          <p className="feedback-success">Thank you for your feedback! ⭐️</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
