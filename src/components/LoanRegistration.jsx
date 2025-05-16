import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/LoanRegistration.css";

const LoanRegistrationForm = () => {
  const [formData, setFormData] = useState({
    aadhaar: "",
    pan: "",
    address: "",
    income: "",
    jobType: "",
    email: "", // Email will be automatically filled
    phone: "",
    scheme: "",
  });

  const [errors, setErrors] = useState({});
  const [schemes, setSchemes] = useState([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState("");
  const [profile, setProfile] = useState(null); // To store the profile data
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch chitty schemes only if you want to display the full list
    fetchChittySchemes();

    // Set the selected scheme from localStorage
    const selectedSchemeName = localStorage.getItem("selectedSchemeName");
    setFormData((prev) => ({ ...prev, scheme: selectedSchemeName }));

    // Fetch profile data from backend
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8081/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfile(res.data); // Set the profile data received from the backend
          setFormData((prev) => ({ ...prev, email: res.data.email })); // Set email from profile
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          setError("Error fetching profile: " + err.message);
        });
    } else {
      setError("No token found. Please log in.");
    }
  }, []);

  const fetchChittySchemes = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/chitty/all");
      setSchemes(res.data);
    } catch (err) {
      console.error("Error fetching chitty schemes:", err);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/^\d{12}$/.test(formData.aadhaar)) {
      newErrors.aadhaar = "Aadhaar must be a 12-digit number";
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) {
      newErrors.pan = "Invalid PAN format (ABCDE1234F)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.income || isNaN(formData.income) || Number(formData.income) <= 0) {
      newErrors.income = "Enter a valid annual income";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be a 10-digit number";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.jobType) {
      newErrors.jobType = "Select a job type";
    }

    if (!formData.scheme.trim()) {
      newErrors.scheme = "Please enter a chitty scheme";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const loanData = { ...formData };

    try {
      const response = await fetch("http://localhost:8081/api/loan/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loanData),
      });

      if (response.ok) {
        alert("✅ Loan registration submitted!");
        setFormData({
          aadhaar: "",
          pan: "",
          address: "",
          income: "",
          jobType: "",
          email: "",
          phone: "",
          scheme: "",
        });
      } else {
        alert("❌ Failed to submit. Try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("⚠️ Server error");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="loan-reg-container">
      <div className="loan-form-card">
        <h2 className="form-title">📝 Loan Registration</h2>
        <form className="loan-form" onSubmit={handleSubmit}>
          {/* Existing fields */}
          <div className="form-group">
            <label>Aadhaar Number</label>
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="XXXX-XXXX-XXXX"
              required
            />
            {errors.aadhaar && <span className="error">{errors.aadhaar}</span>}
          </div>

          <div className="form-group">
            <label>PAN Number</label>
            <input
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              placeholder="ABCDE1234F"
              required
            />
            {errors.pan && <span className="error">{errors.pan}</span>}
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              rows="3"
              required
            ></textarea>
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label>Annual Income (₹)</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              placeholder="Eg: 500000"
              required
            />
            {errors.income && <span className="error">{errors.income}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="yourname@example.com"
              required
              disabled
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              required
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
            >
              <option value="">Select Job Type</option>
              <option value="Salaried">Salaried</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Business">Business</option>
              <option value="Others">Others</option>
            </select>
            {errors.jobType && <span className="error">{errors.jobType}</span>}
          </div>

          <div className="form-group">
            <label>Scheme Name</label>
            <input
              type="text"
              name="scheme"
              value={formData.scheme}
              onChange={handleChange}
              placeholder="Scheme Name"
              required
              disabled
            />
            {errors.scheme && <span className="error">{errors.scheme}</span>}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanRegistrationForm;
