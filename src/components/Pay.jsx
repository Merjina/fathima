import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ChittyScheme.css";
import "../styles/Pay.css";
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/chitty/all");
      setSchemes(res.data);
    } catch (err) {
      console.error("Error fetching schemes", err);
    }
  };

  const handlePayment = (scheme) => {
    navigate("/payment", { state: { scheme } });
  };

  return (
    <div className="chitty-container">
      <h3 style={{ marginTop: "20px" }}>All Chitty Schemes</h3>
      <div className="scheme-list">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="scheme-card">
            <h4>{scheme.schemeName}</h4>
            <p><strong>Amount:</strong> ₹{scheme.amount}</p>
            <button className="pay-btn" onClick={() => handlePayment(scheme)}>
              Make Payment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pay;
