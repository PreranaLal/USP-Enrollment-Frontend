import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GradeRecheckSAS() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Auth check
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    if (user.role_id !== 2) {
      navigate("/dashboard");
      return;
    }

    // Fetch submissions from microservice
    fetch("http://localhost:5000/api/submissions")
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load submissions.");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-3">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4">SAS Manager: Grade Recheck Submissions</h3>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Date Created</th>
            <th>Student ID</th>
            <th>Course ID</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Form Details</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length > 0 ? (
            submissions.map((entry) => (
              <tr key={entry.id}>
                <td>{new Date(entry.createdAt).toLocaleString()}</td>
                <td>{entry.studentId}</td>
                <td>{entry.courseId}</td>
                <td>{entry.reason}</td>
                <td>{entry.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => navigate(`/GradeRecheckbyId?id=${entry.id}`)}
                  >
                    Form Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No submissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="btn btn-link" onClick={() => navigate("/")}>
        Back to Microservice Home
      </button>
    </div>
  );
}

export default GradeRecheckSAS;