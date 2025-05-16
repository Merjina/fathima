import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/LoanRequest.css";
import { useNavigate } from "react-router-dom";

const LoanRequest = () => {
  const [requests, setRequests] = useState([]);
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate(); // ✅ Corrected this

  useEffect(() => {
    fetchLoanRequests();
    fetchApprovedLoans();
    fetchChittySchemes();
  }, []);

  const fetchLoanRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/loan/all");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching loan requests:", error);
    }
  };

  const fetchApprovedLoans = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/loan/approved");
      setApprovedLoans(response.data);
    } catch (error) {
      console.error("Error fetching approved loans:", error);
    }
  };

  const fetchChittySchemes = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/chitty/all");
      setSchemes(response.data);
    } catch (error) {
      console.error("Error fetching chitty schemes:", error);
    }
  };

  const getSchemeName = (schemeId) => {
    const scheme = schemes.find((s) => s.id === schemeId);
    return scheme ? scheme.name : "Unknown Scheme";
  };

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8081/api/loan/approve/${id}`);
      if (response.status === 200) {
        alert("Loan approved!");
        fetchLoanRequests();
        fetchApprovedLoans();
      }
    } catch (error) {
      console.error("Error approving loan:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8081/api/loan/reject/${id}`);
      if (response.status === 200) {
        alert("Loan rejected!");
        fetchLoanRequests();
      }
    } catch (error) {
      console.error("Error rejecting loan:", error);
    }
  };

  return (
    <div className="loan-request-container">
      <h2>Loan Request List</h2>
      <table className="loan-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Aadhaar</th>
            <th>PAN</th>
            <th>Address</th>
            <th>Income</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Type</th>
            <th>Scheme</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => {
            const status = req.status?.trim().toUpperCase();
            const schemeName = getSchemeName(req.selectedSchemeId);
            return (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.aadhaar}</td>
                <td>{req.pan}</td>
                <td>{req.address}</td>
                <td>₹ {req.income}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.jobType}</td>
                <td>{req.scheme}</td>
                <td>{status}</td>
                <td>
                  <div className="button-group">
                    <button className="approve-btn" onClick={() => handleApprove(req.id)}>
                      Approve
                    </button>
                    <button className="reject-btn" onClick={() => handleReject(req.id)}>
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Approved Loan Schemes</h2>
      <table className="approved-loan-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Aadhaar</th>
            <th>PAN</th>
            <th>Address</th>
            <th>Income</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Type</th>
            <th>Scheme</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {approvedLoans.map((loan) => {
  const scheme = getSchemeName(loan.selectedSchemeId);
  const status = loan.status?.trim().toUpperCase();
  return (
    <tr key={loan.id}>
      <td>{loan.id}</td>
      <td>{loan.aadhaar}</td>
      <td>{loan.pan}</td>
      <td>{loan.address}</td>
      <td>₹ {loan.income}</td>
      <td>{loan.email}</td>
      <td>{loan.phone}</td>
      <td>{loan.jobType}</td>
      <td>{loan.scheme}</td>
      <td>{status}</td>
      <td>
      <button className="pay-btn" onClick={() => navigate("/payment", { state: { loan } })}>
  Click to Proceed
</button>

      </td>
    </tr>
  );
})}

        </tbody>
      </table>
    </div>
  );
};

export default LoanRequest;
