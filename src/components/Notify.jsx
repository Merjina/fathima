// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from './Navbar';
// import '../styles/Notify.css';  // Import the CSS file

// const Notify = () => {
//   const [notification, setNotification] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get('http://localhost:8081/api/notifications');
//         // Handle both single object and array responses
//         setNotification(Array.isArray(response.data) ? response.data : [response.data]);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   return (
//     <div className="notification-container">
//       <Navbar />
//       <h2>Loan Notification</h2>
//       {loading ? (
//         <p className="loading-message">Loading...</p>
//       ) : notification && notification.length > 0 ? (
//         notification.map((notify, index) => (
//           <div key={index} className="notification-details">
//             {notify.status === "Payment Successful" && (
//               <div className="success-message">
//                 <p><strong>Success:</strong> Your loan has been successfully received!</p>
//               </div>
//             )}
//             <p><strong>Scheme Name:</strong> {notify.schemeName}</p>
//             <p><strong>Amount:</strong> <span className="amount">${notify.amount}</span></p>
//             <p><strong>Status:</strong> <span className="status">{notify.status}</span></p>
//             <p><strong>Email:</strong> {notify.email}</p>
//             <p><strong>Loan ID:</strong> {notify.loanId}</p>
//           </div>
//         ))
//       ) : (
//         <p>No notifications available</p>
//       )}
//     </div>
//   );
// };

// export default Notify;
import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState("");

    // Function to extract email from JWT
    const getUserEmailFromJWT = () => {
        const token = localStorage.getItem("jwtToken"); // Assuming JWT is stored in localStorage
        if (token) {
            const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT to get payload
            return decoded.email; // Assuming the email is stored in the JWT payload
        }
        return null;
    };

    useEffect(() => {
        const email = getUserEmailFromJWT(); // Get the logged-in user's email
        setUserEmail(email);

        if (email) {
            // Fetch the payment history for the logged-in user using their email
            axios
                .get(`http://localhost:8081/api/payment/history/${email}`)
                .then((response) => {
                    setPayments(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching payment history:", err);
                    setError("Failed to fetch payment history.");
                    setLoading(false);
                });
        } else {
            setError("No user email found in token.");
            setLoading(false);
        }
    }, []);

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Payment History for {userEmail}</h2>
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Account Holder</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Payment Date</th>
                        <th>Email</th>
                        <th>Loan ID</th>
                        <th>Loan Scheme</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.accountHolderName}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.paymentMethod}</td>
                            <td>{formatDate(payment.paymentDate)}</td>
                            <td>{payment.email}</td>
                            <td>{payment.loanId}</td>
                            <td>{payment.schemeName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
