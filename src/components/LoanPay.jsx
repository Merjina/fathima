import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8081/api/payment/history")
            .then((response) => {
                setPayments(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching payment history:", err);
                setError("Failed to fetch payment history.");
                setLoading(false);
            });
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
            <h2>Payment History</h2>
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
