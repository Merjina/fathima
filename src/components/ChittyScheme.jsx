import React, { useEffect, useState } from "react";
import axios from "axios";

const ChittyScheme = () => {
  const [formData, setFormData] = useState({
    id: "",
    schemeName: "",
    amount: "",
    tenure: "",
    startDate: "",
    endDate: "",
    description: "",
    branchId: "", // Added branchId here
  });

  const [branches, setBranches] = useState([]);
  const [chitties, setChitties] = useState([]);

  // Fetch branches and chitty details on component mount
  useEffect(() => {
    fetchBranches();
    fetchChittyDetails();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/branches/all");
      console.log("Fetched branches:", response.data); // Debugging
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
      alert("Failed to fetch branches");
    }
  };

  const fetchChittyDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/chitty/all");
      console.log("Fetched chitties:", response.data); // Debugging
      setChitties(response.data);
    } catch (error) {
      console.error("Error fetching chitties:", error);
      alert("Failed to fetch chitty schemes");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedBranch = branches.find(branch => branch.id === parseInt(formData.branchId));
    const newScheme = {
      ...formData,
      branch: selectedBranch,
    };

    try {
      if (formData.id) { // If formData has id, it's an update
        await axios.put(`http://localhost:8081/api/chitty/edit/${formData.id}`, newScheme);
        alert("Scheme updated successfully!");
      } else { // Otherwise, it's a create operation
        await axios.post("http://localhost:8081/api/chitty/create", newScheme);
        alert("Scheme created successfully!");
      }
      // Reset form and refresh chitty list
      setFormData({
        id: "",
        schemeName: "",
        amount: "",
        tenure: "",
        startDate: "",
        endDate: "",
        description: "",
        branchId: "",
      });
      fetchChittyDetails(); // Refresh the list of chitties after successful creation or update
    } catch (error) {
      console.error("Error submitting scheme:", error);
      alert("Failed to submit scheme");
    }
  };

  const handleEdit = (id) => {
    const scheme = chitties.find((scheme) => scheme.id === id);
    if (scheme) {
      setFormData({
        id: scheme.id, // Store the id for updating
        schemeName: scheme.schemeName,
        amount: scheme.amount,
        tenure: scheme.tenure,
        startDate: scheme.startDate,
        endDate: scheme.endDate,
        description: scheme.description,
        branchId: scheme.branch ? scheme.branch.id : "", // Ensure branch is correctly set here
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/chitty/delete/${id}`);
      alert("Scheme deleted successfully!");
      fetchChittyDetails(); // Refresh the list of chitties after successful deletion
    } catch (error) {
      console.error("Error deleting scheme:", error);
      alert("Failed to delete scheme");
    }
  };

  // Function to get branch name by branchId
  const getBranchName = (branchId) => {
    if (!branchId) return "Not Available"; // If branchId is undefined, return a default message
    const branch = branches.find(branch => branch.id === branchId);
    return branch ? branch.name : "Not Available"; // Return branch name or "Not Available" if not found
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chitty Scheme Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="schemeName"
          value={formData.schemeName}
          onChange={handleChange}
          placeholder="Scheme Name"
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <input
          type="number"
          name="tenure"
          value={formData.tenure}
          onChange={handleChange}
          placeholder="Tenure"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <select
          name="branchId"
          value={formData.branchId}
          onChange={handleChange}
          required
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        <button type="submit">{formData.id ? "Update Scheme" : "Create Scheme"}</button>
      </form>

      <h2 style={{ marginTop: "30px" }}>Chitty Schemes</h2>
      {chitties.length === 0 ? (
        <p>No schemes found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Scheme Name</th>
              <th>Amount</th>
              <th>Tenure</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Description</th>
              <th>Branch Id</th> {/* Column for Branch Name */}    
              <th>Branch Name</th> {/* Column for Branch Name */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {chitties.map((scheme) => (
    <tr key={scheme.id}>
      <td>{scheme.id}</td>
      <td>{scheme.schemeName}</td>
      <td>{scheme.amount}</td>
      <td>{scheme.tenure}</td>
      <td>{scheme.startDate}</td>
      <td>{scheme.endDate}</td>
      <td>{scheme.description}</td>
      <td>{scheme.branch?.id || "Not Available"}</td> {/* ✅ Corrected line */}
    
      <td>{scheme.branch?.name || "Not Available"}</td> {/* ✅ Corrected line */}
      <td>
        <button onClick={() => handleEdit(scheme.id)}>Edit</button>
        <button onClick={() => handleDelete(scheme.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
};

export default ChittyScheme;
