import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Program() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
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
      // Fetch student details for students (role_id = 3)
      axios
        .get(`http://localhost:4149/api/student/${parsedUser.id}`)
        .then((response) => {
          setStudentData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching student data:", err);
          setError("Failed to fetch student data.");
          setLoading(false);
        });

      // Fetch student enrollments (with course details)
      axios
        .get(`http://localhost:4149/api/student/${parsedUser.id}/enrollments`)
        .then((response) => {
          // Assuming the API returns a list of enrollments with course details
          setStudentData((prevData) => ({
            ...prevData,
            enrolledUnits: response.data,
          }));
        })
        .catch((err) => {
          console.error("Error fetching student enrollments:", err);
        });
    } else {
      navigate("/staff-dashboard");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:4149/api/finances/${user.id}`);
      const financeRecords = response.data; // Assuming API returns an array of records

      // Check if any record has 'hold' status
      const hasHold = financeRecords.some(record => record.status === "hold");

      if (hasHold) {
        alert("❌ You have a financial hold. Please clear your dues before enrolling.");
      } else {
        navigate("/Course_Enroll");
      }
    } catch (error) {
      console.error("Error checking financial status:", error);
      alert("⚠️ Unable to verify financial status. Please try again.");
    }
  };

  const handleDropCourse = async (enrollmentId) => {
    try {
      await axios.delete(`http://localhost:4149/api/enrollment/${enrollmentId}`);
      // Refresh the enrollments list
      const response = await axios.get(`http://localhost:4149/api/student/${user.id}/enrollments`);
      setStudentData((prevData) => ({
        ...prevData,
        enrolledUnits: response.data,
      }));
    } catch (error) {
      console.error("Error dropping course:", error);
      alert("⚠️ Unable to drop the course. Please try again.");
    }
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
              onClick={() => navigate("/program_requirements")}
            >
              Program Requirements
            </button>
          </div>
        </div>
      </nav>

      {/* Program Details */}
      <div className="container my-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            Program Details
          </div>
          <div className="card-body">
            <table className="table table-striped table-bordered mb-0">
              <tbody>
                <tr>
                  <td><strong>Student Name</strong></td>
                  <td>
                    {studentData.first_name} {studentData.last_name}
                  </td>
                </tr>
                <tr>
                  <td><strong>Program</strong></td>
                  <td>{studentData?.program_name || "Not assigned"}</td>
                </tr>
                <tr>
                  <td><strong>Enrolled Units</strong></td>
                  <td>
                    {studentData.enrolledUnits && studentData.enrolledUnits.length > 0 ? (
                      <ul className="mb-0">
                        {studentData.enrolledUnits.map((unit, index) => (
                          <li key={index} className="d-flex justify-content-between align-items-center mb-2">
                            <span>{unit.course_code} - {unit.course_name}</span>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDropCourse(unit.enrollment_id)}
                            >
                              Drop
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No units enrolled currently</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Course Button */}
      <div className="d-flex justify-content-center mt-4 mb-5">
        <button className="btn btn-primary" onClick={handleAddCourse}>Add Course</button>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white p-3 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6 border-right">
              Disclaimer & Copyright | Contact Us
            </div>
            <div className="col-md-6 text-md-right">
              University of the South Pacific, Laucala Campus, Suva, Fiji, Tel:
              +679 3231000
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Program;