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
  const [grades, setGrades] = useState([]);

  // Fetch student info and grades from backend
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      // Always fetch from backend for security
      fetch(`http://localhost:4149/api/student/by-id/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setStudentId(data.id || "");
          setFirstName(data.first_name || "");
          setLastName(data.last_name || "");
        });
      // Fetch grades for this student
      fetch(`http://localhost:4149/api/grades/${user.id}`)
        .then((res) => res.json())
        .then((data) => setGrades(data))
        .catch(() => setGrades([]));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/grade-recheck", {
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
                readOnly
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                readOnly
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                readOnly
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseId" className="form-label">Course ID</label>
              <select
                className="form-select"
                id="courseId"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
              >
                <option value="">Select Course</option>
                {grades.map((grade) => (
                  <option key={grade.course_code} value={grade.course_code}>
                    {grade.course_code} 
                  </option>
                ))}
              </select>
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