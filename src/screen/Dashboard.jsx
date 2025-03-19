import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const navigate = useNavigate(); // Hook for navigation
  const [user, setUser] = useState({
    isLoggedIn: false,
    id: "123456",
    firstName: "User",
    lastName: "Doe",
    dob: "1990-01-01",
    email: "user@example.com",
    phone: "+1234567890",
    program: "Computer Science",
  });

  // Toggle login state
  const handleLoginLogout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: !prev.isLoggedIn,
      firstName: prev.isLoggedIn ? "User" : "John", // Change the name when logged in.
    }));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <div className="bg-primary text-white p-3 d-flex align-items-center">
        <img
          src="/public/USP_Logo.png" // Ensure correct path
          alt="Logo"
          style={{ width: "50px", height: "50px", marginRight: "8px" }}
        />
        <h3 className="mb-0">Dashboard</h3>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
            onClick={() => navigate("/program-requirements")}
          >
            Program Requirements
          </button>
        </div>
        <div className="ml-auto">
          <button className="btn btn-outline-primary" onClick={handleLoginLogout}>
            {user.isLoggedIn ? "Log Out" : "Log In"}
          </button>
        </div>
      </nav>

      {/* Student Information Card */}
      <div className="container my-4">
        <div className="card">
          <div className="card-header">
            Welcome {user.isLoggedIn ? user.firstName : "User"}
          </div>
          <div className="card-body">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phone}</p>
            <p><strong>Program:</strong> {user.program}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white p-3 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6 border-right">Disclaimer & Copyright | Contact Us</div>
            <div className="col-md-6 text-md-right">
              University of the South Pacific Laucala Campus, Suva, Fiji, Tel: +679 3231000
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
