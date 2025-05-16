import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Payment.css";

const Payment = () => {
  const location = useLocation();
  const { loan } = location.state || {};

  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("UPI");
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  useEffect(() => {
    if (loan?.scheme) {
      fetchAmountFromScheme(loan.scheme);
    }
  }, [loan]);

  const fetchAmountFromScheme = async (schemeName) => {
    try {
      const res = await axios.get("http://localhost:8081/api/chitty/all");
      const scheme = res.data.find((item) => item.schemeName === schemeName);
      if (scheme) {
        setAmount(scheme.amount);
      }
    } catch (error) {
      console.error("Error fetching scheme amount:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      alert("Please fill all required fields properly.");
      return;
    }

    const paymentData = {
      loanId: loan.id,
      amount,
      mode,
      schemeName: loan?.scheme || "Default Scheme",
      paymentDate: new Date().toISOString(),
      name: loan.name,
      email: loan.email,
      paymentMethod: mode,
      ...paymentDetails,
    };

    try {
      const response = await axios.post("http://localhost:8081/api/payment/add", paymentData);
      if (response.status === 200 || response.status === 201) {
        alert("Payment successful!");
      }
    } catch (error) {
      console.error("Payment failed:", error.response ? error.response.data : error.message);
      alert("Payment failed. Please try again.");
    }
  };

  const validateForm = () => {
    if (!amount || !mode || !loan?.scheme || !loan?.id) {
      return false;
    }

    switch (mode) {
      case "UPI":
        return paymentDetails.upiId.trim() !== "";
      case "Card":
        return (
          paymentDetails.cardNumber &&
          paymentDetails.cardName &&
          paymentDetails.expiry &&
          paymentDetails.cvv
        );
      case "Net Banking":
        return (
          paymentDetails.bankName &&
          paymentDetails.accountNumber &&
          paymentDetails.ifscCode &&
          paymentDetails.accountHolderName
        );
      default:
        return false;
    }
  };

  const renderPaymentFields = () => {
    switch (mode) {
      case "UPI":
        return (
          <>
            <label>UPI ID:</label>
            <input
              type="text"
              name="upiId"
              value={paymentDetails.upiId}
              onChange={handleInputChange}
              placeholder="e.g., user@bank"
              required
            />
          </>
        );
      case "Card":
        return (
          <>
            <label>Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              maxLength="16"
              required
            />
            <label>Name on Card:</label>
            <input
              type="text"
              name="cardName"
              value={paymentDetails.cardName}
              onChange={handleInputChange}
              required
            />
            <label>Expiry (MM/YY):</label>
            <input
              type="text"
              name="expiry"
              value={paymentDetails.expiry}
              onChange={handleInputChange}
              placeholder="MM/YY"
              required
            />
            <label>CVV:</label>
            <input
              type="password"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              maxLength="3"
              required
            />
          </>
        );
      case "Net Banking":
        return (
          <>
            <label>Bank Name:</label>
            <input
              type="text"
              name="bankName"
              value={paymentDetails.bankName}
              onChange={handleInputChange}
              required
            />
            <label>Account Number:</label>
            <input
              type="text"
              name="accountNumber"
              value={paymentDetails.accountNumber}
              onChange={handleInputChange}
              required
            />
            <label>IFSC Code:</label>
            <input
              type="text"
              name="ifscCode"
              value={paymentDetails.ifscCode}
              onChange={handleInputChange}
              required
            />
            <label>Account Holder Name:</label>
            <input
              type="text"
              name="accountHolderName"
              value={paymentDetails.accountHolderName}
              onChange={handleInputChange}
              required
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      {loan ? (
        <div className="payment-form">
          <p><strong>Email:</strong> {loan.email}</p>
          <p><strong>Loan ID:</strong> {loan.id}</p>
          <p><strong>Loan Scheme:</strong> {loan.scheme}</p>
          <p><strong>Status:</strong> {loan.status}</p>
          <p><strong>Amount to Pay:</strong> ₹{amount}</p>

          <label>Payment Mode:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>

          {renderPaymentFields()}

          <button onClick={handlePayment}>Make Payment</button>
        </div>
      ) : (
        <p>No loan selected.</p>
      )}
    </div>
  );
};

export default Payment;
