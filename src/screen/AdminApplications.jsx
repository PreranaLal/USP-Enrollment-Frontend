import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function AdminApplications() {
  const [gradApps, setGradApps] = useState([]);
  const [compApps, setCompApps] = useState([]);
  const [resitApps, setResitApps] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
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

    fetchAllApplications();
    // eslint-disable-next-line
  }, [navigate]);

  const fetchAllApplications = async () => {
    try {
      const [gradRes, compRes, resitRes] = await Promise.all([
        axios.get("http://localhost:4149/api/forms/graduation"),
        axios.get("http://localhost:4149/api/forms/compassionate"),
        axios.get("http://localhost:4149/api/forms/resit")
      ]);
      setGradApps(gradRes.data);
      setCompApps(compRes.data);
      setResitApps(resitRes.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load applications.");
      setLoading(false);
    }
  };

  const handleDecision = async (app, type, decision) => {
    const reason = prompt(`Enter reason for ${decision === "approved" ? "approval" : "rejection"}:`);
    if (!reason) return alert("Reason is required.");

    // Get admin info from localStorage
    const adminUser = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      await axios.post("http://localhost:4149/api/forms/decision", {
        applicationType: type,
        applicationId: app.Id,
        email: app.email,
        decision,
        reason,
        app,
        admin: {
          id: adminUser.id || "",
          name: adminUser.fullName || "",
          timestamp: new Date().toISOString()
        }
      });
      alert(`Application ${decision}! Email sent to student.`);

      // Remove the application from the relevant state array
      if (type === "graduation") {
        setGradApps(prev => prev.filter(a => a.Id !== app.Id));
      } else if (type === "compassionate") {
        setCompApps(prev => prev.filter(a => a.Id !== app.Id));
      } else if (type === "resit") {
        setResitApps(prev => prev.filter(a => a.Id !== app.Id));
      }
    } catch (err) {
      alert("Failed to process decision.");
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
    return <div className="alert alert-danger text-center mt-3">{error}</div>;
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Admin: Student Applications</h2>
      {/* Graduation Applications */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">Graduation Applications</div>
        <div className="card-body">
          {gradApps.length === 0 ? (
            <p>No graduation applications found.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Program</th>
                  <th>Expected Semester</th>
                  <th>Date Applied</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {gradApps
                  .filter(app => !app.applicationDecision)
                  .map((app, idx) => (
                    <tr key={idx}>
                      <td>{app.Id}</td>
                      <td>{app.program}</td>
                      <td>{app.gradSemester}</td>
                      <td>
                        {app.appDate
                          ? new Date(app.appDate).toLocaleDateString()
                          : ""}
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleDecision(app, "graduation", "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDecision(app, "graduation", "rejected")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Compassionate Applications */}
      <div className="card mb-4">
        <div className="card-header bg-danger text-white">Compassionate/Special Applications</div>
        <div className="card-body">
          {compApps.length === 0 ? (
            <p>No compassionate applications found.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Course(s)</th>
                  <th>Reason</th>
                  <th>Date Applied</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {compApps
                  .filter(app => !app.applicationDecision)
                  .map((app, idx) => (
                    <tr key={idx}>
                      <td>{app.Id}</td>
                      <td>
                        {Array.isArray(app.missedExams) && app.missedExams.length > 0
                          ? app.missedExams.map((ex) =>
                              ex.courseId || ex.course || ""
                            ).join(", ")
                          : ""}
                      </td>
                      <td>{app.reason}</td>
                      <td>
                        {app.appDate
                          ? new Date(app.appDate).toLocaleDateString()
                          : ""}
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleDecision(app, "compassionate", "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDecision(app, "compassionate", "rejected")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Re-sit Applications */}
      <div className="card mb-4">
        <div className="card-header bg-warning text-white">Re-sit Applications</div>
        <div className="card-body">
          {resitApps.length === 0 ? (
            <p>No re-sit applications found.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Course(s)</th>
                  <th>Reason(s)</th>
                  <th>Date Applied</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {resitApps
                  .filter(app => !app.applicationDecision)
                  .map((app, idx) => (
                    <tr key={idx}>
                      <td>{app.Id}</td>
                      <td>
                        {Array.isArray(app.resitCourses) && app.resitCourses.length > 0
                          ? app.resitCourses.map((rc) =>
                              rc.courseId || rc.course || ""
                            ).join(", ")
                          : ""}
                      </td>
                      <td>
                        {Array.isArray(app.resitCourses) && app.resitCourses.length > 0
                          ? app.resitCourses.map((rc) =>
                              rc.reason
                            ).join(", ")
                          : ""}
                      </td>
                      <td>
                        {app.appDate
                          ? new Date(app.appDate).toLocaleDateString()
                          : ""}
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleDecision(app, "resit", "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDecision(app, "resit", "rejected")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminApplications;