import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignChittyForm = () => {
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [chittySchemes, setChittySchemes] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedScheme, setSelectedScheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch users
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8081/api/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("There was an error fetching the users.");
        setLoading(false);
      });
  }, []);

  // Fetch branches
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8081/api/branches")
      .then((response) => {
        setBranches(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("There was an error fetching the branches.");
        setLoading(false);
      });
  }, []);

  // Fetch chitty schemes based on selected branch
 useEffect(() => {
    axios.get("http://localhost:8081/api/schemes")  .then((response) => {
      console.log("Fetched schemes:", response.data);
      setChittySchemes(response.data);
    })
    .catch((error) => {
      console.error("There was an error fetching the chitty schemes!", error);
    });
}, []);

  
  // Handle Assign Button
  const handleAssign = () => {
    if (selectedUser && selectedScheme) {
      setLoading(true);
      axios.post("http://localhost:8081/api/assign-chitty", {
        userId: selectedUser,
        chittyId: selectedScheme
      })
        .then(() => {
          alert("User successfully assigned to Chitty Scheme!");
          setSelectedUser("");
          setSelectedBranch("");
          setSelectedScheme("");
          setLoading(false);
        })
        .catch((error) => {
          setError("Assignment failed!");
          setLoading(false);
        });
    } else {
      alert("Please select a user and a scheme!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Assign User to Chitty Scheme</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ margin: "10px" }}>
        <label>Select User: </label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ margin: "10px" }}>
        <label>Select Branch: </label>
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="">Select a branch</option>
          {branches.map(branch => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ margin: "10px" }}>
        <label>Select Chitty Scheme: </label>
        <select value={selectedScheme} onChange={(e) => setSelectedScheme(e.target.value)}>
          <option value="">Select a chitty scheme</option>
          {chittySchemes.map(scheme => (
            <option key={scheme.id} value={scheme.id}>
              {scheme.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAssign} disabled={loading}>Assign</button>
    </div>
  );
};

export default AssignChittyForm;
