import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8081/api/feedback/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback-list">
      <h2>All Feedbacks</h2>
      <table>
        <thead>
          <tr>
            <th>userId</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Chitty Scheme</th>
            <th>Rating</th>
            <th>Comment</th>
           </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb) => (
            <tr key={fb.id}>
              <td>{fb.user.id}</td>
              <td>{fb.user.name}</td>
              <td>{fb.user.email}</td>   
              <td>{fb.chitty.schemeName}</td>
              <td>{fb.rating}</td>
              <td>{fb.comment}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackList;
