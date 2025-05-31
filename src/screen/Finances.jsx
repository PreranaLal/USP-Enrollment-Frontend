import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Finance() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [financeData, setFinanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.role_id === 3) {
      // First fetch student data
      axios
        .get(`http://localhost:4149/api/student/${parsedUser.id}`)
        .then((response) => {
          setStudentData(response.data);
          const studentId = response.data.id;
          // Now fetch finance data using studentId
          return axios.get(`http://localhost:4149/api/finances/${studentId}`);
        })
        .then((response) => {
          setFinanceData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching finance data:", error);
          setError("Failed to fetch finance data.");
          setLoading(false);
        });
    } else {
      navigate("/staff-dashboard");
    }
  }, [navigate]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <div className="alert alert-danger text-center mt-3">{error}</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Finance Information Table */}
      {financeData ? (
        <div className="container my-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              Finance Details
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>Invoice Number</th>
                      <th>Status</th>
                      <th>Year</th>
                      <th>Debit</th>
                      <th>Credit</th>
                      <th>Semester</th>
                      <th>Payment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financeData.length > 0 ? (
                      financeData.map((record, index) => (
                        <tr key={index}>
                          <td>{record.invoice_number}</td>
                          <td>{record.status}</td>
                          <td>{record.year}</td>
                          <td style={{ color: "red" }}>
                            ${record.amount_debit ? record.amount_debit : "-"}
                          </td>
                          <td style={{ color: "green" }}>
                            ${record.amount_credit ? record.amount_credit : "-"}
                          </td>
                          <td>{record.semester}</td>
                          <td>{record.payment_date ? new Date(record.payment_date).toLocaleDateString() : ""}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">No finance data found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container my-4">
          <div className="alert alert-warning text-center">
            No finance data found.
          </div>
        </div>
      )}
    </div>
  );
}

export default Finance;
