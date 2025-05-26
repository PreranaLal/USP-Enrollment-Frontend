import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentGradeRecheck() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Autofill student info if available
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setStudentId(user.id || "");
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await fetch("http://localhost:5000/grade-recheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          firstName,
          lastName,
          courseId,
          reason,
        }),
      });
      if (res.ok) {
        setMessage("Grade recheck submitted successfully!");
        setStudentId("");
        setFirstName("");
        setLastName("");
        setCourseId("");
        setReason("");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to submit recheck.");
      }
    } catch (err) {
      setError("Failed to submit recheck.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Grade Recheck Form</h3>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="studentId" className="form-label">Student ID</label>
              <input
                type="text"
                className="form-control"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseId" className="form-label">Course ID</label>
              <input
                type="text"
                className="form-control"
                id="courseId"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reason" className="form-label">Reason for Change</label>
              <textarea
                className="form-control"
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit Recheck
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-3">
        <button className="btn btn-link" onClick={() => navigate("/")}>
          Back to Microservice Home
        </button>
      </div>
    </div>
  );
}

export default StudentGradeRecheck;