import React, { useEffect, useState } from "react";
import axios from "axios";

const AuctionManagement = () => {
    const [auctions, setAuctions] = useState([]);
    const [branches, setBranches] = useState([]);
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch auctions
    useEffect(() => {
        axios
            .get("http://localhost:8081/api/auction/history") // Replace with your auction endpoint
            .then((response) => {
                setAuctions(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching auction history:", err);
                setError("Failed to fetch auction history.");
                setLoading(false);
            });
    }, []);

    // Fetch branches
    const fetchBranches = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/branches/all");
            console.log("Fetched branches:", response.data); // Debugging
            setBranches(response.data);
        } catch (err) {
            console.error("Error fetching branches:", err.response?.data || err.message);
            alert("Failed to fetch branches");
        }
    };

    // Fetch schemes
    const fetchSchemes = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/chitty/all");
            console.log("Fetched schemes:", response.data); // Debugging
            setSchemes(response.data);
        } catch (err) {
            console.error("Error fetching schemes:", err.response?.data || err.message);
            alert("Failed to fetch schemes");
        }
    };

    useEffect(() => {
        fetchBranches();
        fetchSchemes();
    }, []);

    // Helper to find the branch name by ID
    const getBranchName = (branchId) => {
        const branch = branches.find((branch) => branch.id === branchId);
        return branch ? branch.name : "Branch not found";
    };

    // Helper to find the scheme name by ID
    const getSchemeName = (schemeId) => {
        const scheme = schemes.find((scheme) => scheme.id === schemeId);
        return scheme ? scheme.schemeName : "Scheme not found";
    };

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
            <h2>Auction History</h2>

            {/* Display Auctions in a Table */}
            <h3>Auction List</h3>
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Auction ID</th>
                        <th>Date</th>
                        <th>Winning Member</th>
                        <th>Winning Amount</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {auctions.map((auction) => (
                        <tr key={auction.auctionId}>
                            <td>{auction.auctionId}</td>
                            <td>{formatDate(auction.auctionDate)}</td>
                            <td>{auction.winningMemberEmail || "-"}</td>
                            <td>10000</td> {/* Hardcoding the winning amount */}
                            <td>{getSchemeName(auction.schemeId)}</td> {/* Mapping schemeId to schemeName */}
                            <td>{getBranchName(auction.branchId)}</td> {/* Mapping branchId to branchName */}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Display Branches as Cards */}
            <h3>Branches</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {branches.map((branch) => (
                    <div
                        key={branch.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            width: "200px",
                            borderRadius: "5px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        }}
                    >
                        <h4>{branch.name}</h4>
                        <p>Location: {branch.location}</p>
                        <p>Manager: {branch.manager}</p>
                        <p>Contact: {branch.contact}</p>
                    </div>
                ))}
            </div>

            {/* Display Schemes as Cards */}
            <h3>Schemes</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {schemes.map((scheme) => (
                    <div
                        key={scheme.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            width: "200px",
                            borderRadius: "5px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        }}
                    >
                        <h4>{scheme.schemeName}</h4>
                        <p>Amount: {scheme.amount}</p>
                        <p>Tenure: {scheme.tenure} months</p>
                        <p>Start Date: {formatDate(scheme.startDate)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuctionManagement;
