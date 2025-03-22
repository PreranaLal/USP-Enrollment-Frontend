import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function EnrollCourses() {
  const navigate = useNavigate();
  const [eligibleCourses, setEligibleCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch logged-in user and eligible courses on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    axios
      .get(`http://localhost:4149/api/eligible-courses/${parsedUser.id}`)
      .then((response) => {
        setEligibleCourses(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching eligible courses:", err);
        setError("Failed to load eligible courses.");
        setLoading(false);
      });
  }, [navigate]);

  // Enroll student in a course by sending the integer course_id
  const handleEnroll = (courseId) => {
    if (!user) return;
    axios
      .post('http://localhost:4149/api/enroll', {
        student_id: user.id,
        course_id: courseId
      })
      .then((res) => {
        alert("Enrolled successfully in course ID " + courseId + "!");
        // Optionally refresh eligibleCourses here if needed.
      })
      .catch((err) => {
        console.error("Error enrolling in course:", err);
        alert("Failed to enroll in course ID " + courseId);
      });
  };
  

  // Basic logout functionality
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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

      {/* Enrollment Table */}
      <div className="container mt-4">
        <h2 className="text-center mb-4">Enroll in Courses</h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Program</th>
                <th>Course</th>
                <th>Prerequisite Course</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {eligibleCourses.length === 0 ? (
                <tr>
                  <td colSpan="6">No courses available for enrollment.</td>
                </tr>
              ) : (
                eligibleCourses.map(course => (
                  <tr key={course.course_id}>
                    <td>{course.first_name} {course.last_name}</td>
                    <td>{course.program_name}</td>
                    <td>{course.course} ({course.course_id})</td>
                    <td>{course.prerequisite_course || "None"}</td>
                    <td>{course.status}</td>
                    <td>
                      <button 
                        onClick={() => handleEnroll(course.course_id)} 
                        className="btn btn-primary"
                      >
                        Enroll
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white p-3 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6 border-right">
              Disclaimer & Copyright | Contact Us
            </div>
            <div className="col-md-6 text-md-right">
              University of the South Pacific Laucala Campus, Suva, Fiji, Tel: +679 3231000
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EnrollCourses;
