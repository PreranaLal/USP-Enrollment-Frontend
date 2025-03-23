import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function ProgramRequirements() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
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
      // Fetch eligible courses for the logged-in student
      axios
        .get(`http://localhost:4149/api/program-courses/${parsedUser.id}`)
        .then((response) => {
          setCourses(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
          setError("Failed to fetch course data.");
          setLoading(false);
        });
    } else {
      // Redirect staff users to their dashboard (if implemented)
      navigate("/staff-dashboard");
    }
  }, [navigate]);

  // Basic logout functionality
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <div className="bg-primary text-white p-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src="./USP_Logo.png"
            alt="USP Logo"
            style={{ width: '50px', height: '50px', marginRight: '8px' }}
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
            <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Dashboard')}>Home</button>
            <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Program')}>My Courses</button>
            <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Finances')}>My Finances</button>
            <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Grades')}>My Grades</button>
            <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Program_Requirements')}>Program Requirements</button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center mb-4">Program Requirements</h2>
        {loading ? (
          <p className="text-center">Loading courses...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Prerequisite</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                [...courses]
                  .sort((a, b) => {
                    const statusOrder = {
                      "Prerequisite Not Met": 1, 
                      "Pending": 2, 
                      "Enrolled": 3, 
                      "Completed": 4 
                    };
                    return statusOrder[a.status] - statusOrder[b.status];
                  })
                  .map((course, index) => (
                    <tr key={index}>
                      <td>{course.course}</td>
                      <td>{course.course_name}</td>
                      <td>{course.prerequisite_course || 'None'}</td>
                      <td>
                        <span className={`badge 
                          ${course.status === 'Completed' ? 'bg-success' : 
                          course.status === 'Enrolled' ? 'bg-info' : 
                          course.status === 'Prerequisite Not Met' ? 'bg-danger' : 
                          'bg-warning'}`}>{course.status}</span>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No course data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <footer className="bg-primary text-white p-3 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6 border-right">Disclaimer & Copyright | Contact Us</div>
            <div className="col-md-6 text-md-right">University of the South Pacific, Suva, Fiji</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProgramRequirements;
