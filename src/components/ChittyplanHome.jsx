import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ChittyplanHome.css"; // Ensure this CSS file exists
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const ChittyPlansHome = () => {
  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/chitty/all");
      setSchemes(res.data);
    } catch (err) {
      console.error("Error fetching chitty schemes:", err);
    }
  };

  const isSchemeExpired = (endDate) => {
    const currentDate = new Date();
    const schemeEndDate = new Date(endDate);
    return currentDate > schemeEndDate;
  };

  const handleJoinScheme = (schemeId, schemeName) => {
    localStorage.setItem("selectedSchemeId", schemeId);
    localStorage.setItem("selectedSchemeName", schemeName);
    navigate("/loanreg");
  };

  return (
    <>
      <Navbar />
      <div className="plans-container">
        <div className="plans-grid">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="plan-card">
              <h3>{scheme.schemeName}</h3>
              <p><strong>Amount:</strong> ₹{scheme.amount}</p>
              <p><strong>Tenure:</strong> {scheme.tenure} months</p>
              <p><strong>Start Date:</strong> {scheme.startDate}</p>
              <p><strong>End Date:</strong> {scheme.endDate}</p>
              <p><strong>Description:</strong> {scheme.description}</p>
              <button
                className="join-btn"
                onClick={() => handleJoinScheme(scheme.id, scheme.schemeName)}
                disabled={isSchemeExpired(scheme.endDate)}
              >
                {isSchemeExpired(scheme.endDate) ? "Scheme Ended" : "Join Scheme"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChittyPlansHome;
