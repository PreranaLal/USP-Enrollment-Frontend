import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GradeRecheckById() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState("pending");
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get id and studentId from query params
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const studentId = params.get("studentId");

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

    // Fetch form details
    fetch(`http://localhost:5000/api/submissions/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Form not found.");
        return res.json();
      })
      .then((entry) => {
        setForm(entry);
        setStatus(entry.status || "pending");
        setRejectReason(entry.rejectReason || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Form not found.");
        setLoading(false);
      });
  }, [navigate, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const resp = await fetch(`http://localhost:5000/api/submissions/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          rejectReason: status === "rejected" ? rejectReason : null,
        }),
      });
      if (resp.ok) {
        setSuccess("Status updated!");
        setForm((prev) => ({
          ...prev,
          status,
          rejectReason: status === "rejected" ? rejectReason : null,
        })); // Update local form state
      } else {
        setError("Failed to update status.");
      }
    } catch {
      setError("Failed to update status.");
    }
  };

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
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-link" onClick={() => navigate("/SASGrades")}>
          Back to Submissions
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Grade Recheck Form (Read Only)</h3>
        </div>
        <div className="card-body" id="form-area">
          {success && <div className="alert alert-success">{success}</div>}
          <form id="updateForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Student ID</label>
              <input type="text" className="form-control" value={form.studentId} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" value={form.firstName} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" value={form.lastName} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Course ID</label>
              <input type="text" className="form-control" value={form.courseId} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Reason for Change</label>
              <textarea className="form-control" value={form.reason} rows={3} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approve</option>
                <option value="rejected">Reject</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Reject Reason</label>
              <textarea
                className="form-control"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={2}
                disabled={status !== "rejected"}
                placeholder={status === "rejected" ? "Enter reason for rejection" : " "}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Update Form
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-3">
        <button className="btn btn-link" onClick={() => navigate("/manager")}>
          Back to Manager Table
        </button>
      </div>
    </div>
  );
}

export default GradeRecheckById;