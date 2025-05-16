import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BranchManagement.css";

const BranchManagement = () => {
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    manager: "",
    contact: "",
    email: "",
    establishedYear: ""
  });
  const [editingBranchId, setEditingBranchId] = useState(null);

  // Fetch all branches
  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/branches/all");
      setBranches(response.data);
    } catch (err) {
      console.error("Error fetching branches:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBranchId) {
        // Update
        await axios.put(`http://localhost:8081/api/branches/update/${editingBranchId}`, formData);
      } else {
        // Create
        await axios.post("http://localhost:8081/api/branches/save", formData);
      }
      setFormData({
        name: "",
        location: "",
        manager: "",
        contact: "",
        email: "",
        establishedYear: ""
      });
      setEditingBranchId(null);
      fetchBranches();
    } catch (err) {
      console.error("Error saving branch:", err.response?.data || err.message);
    }
  };

  const handleEdit = (branch) => {
    setFormData(branch);
    setEditingBranchId(branch.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/branches/delete/${id}`);
      fetchBranches();
    } catch (err) {
      console.error("Error deleting branch:", err.response?.data || err.message);
    }
  };

  return (
    <div className="branch-container">
      <div className="branch-content">
        <div className="branch-form-card">
          <h2 className="form-title">{editingBranchId ? "✏️ Edit Branch" : "➕ Add New Branch"}</h2>
          <form onSubmit={handleSubmit} className="branch-form">
            {["name", "location", "manager", "contact", "email", "establishedYear"].map((field) => (
              <div className="form-group" key={field}>
                <label>{field.replace(/([A-Z])/g, " $1")}</label>
                <input
                  type={field === "email" ? "email" : field === "contact" ? "tel" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  required
                />
              </div>
            ))}
            <button type="submit" className="submit-btn">
              {editingBranchId ? "Update Branch" : "Add Branch"}
            </button>
          </form>
        </div>

        <div className="branch-list">
  <h2>📋 Branch List</h2>
  <div className="table-container">
    <table className="branch-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Manager</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {branches.map((branch) => (
          <tr key={branch.id}>
            <td>{branch.name}</td>
            <td>{branch.location}</td>
            <td>{branch.manager}</td>
            <td>{branch.contact}</td>
            <td>{branch.email}</td>
            <td>{branch.establishedYear}</td>
            <td>
              <button onClick={() => handleEdit(branch)}>Edit</button>{" "}
              <button onClick={() => handleDelete(branch.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      </div>
    </div>
  );
};

export default BranchManagement;
