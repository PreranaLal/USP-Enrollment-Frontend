import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [staffData, setStaffData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // Redirect to login if no user is found
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.role_id === 3) {
      axios.get(`http://localhost:4149/api/student/${parsedUser.id}`)
        .then(response => {
          setStudentData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching student data:", error);
          setError("Failed to fetch student data.");
          setLoading(false);
        });

    } else if (parsedUser.role_id === 2) {
      // Fetch staff details
      axios.get(`http://localhost:4149/api/staff/${parsedUser.id}`)
        .then(response => {
          setStaffData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching staff data:", error);
          setError("Failed to fetch staff data.");
          setLoading(false);
        });
    } else {
      setLoading(false);
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

  if (error) return <div className="alert alert-danger text-center mt-3">{error}</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <div className="bg-primary text-white p-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src="/USP_Logo.png"
            alt="USP Logo"
            style={{ width: "50px", height: "50px", marginRight: "8px" }}
          />
          <h3 className="mb-0">Dashboard</h3>
        </div>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div className="navbar-nav">
            <button
              className="btn btn-link nav-item nav-link"
              onClick={() => navigate("/dashboard")}
            >
              Home
            </button>
            <button
              className="btn btn-link nav-item nav-link"
              onClick={() => navigate("/program")}
            >
              My Courses
            </button>
            <button
              className="btn btn-link nav-item nav-link"
              onClick={() => navigate("/finances")}
            >
              My Finances
            </button>
            <button
              className="btn btn-link nav-item nav-link"
              onClick={() => navigate("/grades")}
            >
              My Grades
            </button>
            <button
              className="btn btn-link nav-item nav-link"
              onClick={() => navigate("/Program_Requirements")}
            >
              Program Requirements
            </button>
          </div>
        </div>
      </nav>

      {/* Student Information Card */}
      {studentData && (
        <div className="container my-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              Welcome {studentData.first_name} {studentData.last_name}
            </div>
            <div className="card-body">
              <p>
                <strong>ID:</strong> {studentData.id}
              </p>
              <p>
                <strong>First Name:</strong> {studentData.first_name}
              </p>
              <p>
                <strong>Last Name:</strong> {studentData.last_name}
              </p>
              <p>
                <strong>Date of Birth:</strong> {new Date(studentData.dob).toLocaleDateString('en-GB')}
              </p>
              <p>
                <strong>Email:</strong> {studentData.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {studentData.phone || "N/A"}
              </p>
              <p>
                <strong>Program:</strong> {studentData?.program_name || "Not assigned"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Staff Information Card */}
      {staffData && (
        <div className="container my-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              Welcome {staffData.first_name} {staffData.last_name}
            </div>
            <div className="card-body">
              <p><strong>ID:</strong> {staffData.id}</p>
              <p><strong>First Name:</strong> {staffData.first_name}</p>
              <p><strong>Last Name:</strong> {staffData.last_name}</p>
              <p><strong>Email:</strong> {staffData.email}</p>
              <p><strong>Phone:</strong> {staffData.phone}</p>
              <p><strong>Department:</strong> {staffData.department}</p>
              <p><strong>Position:</strong> {staffData.position}</p>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
