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
  // State to store enrolled course IDs
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Fetch logged-in user and eligible courses on component mount
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
        // Mark this course as enrolled in the state
        setEnrolledCourses(prev => [...prev, courseId]);
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
           

      {/* Enrollment Table */}
      <div className="container mt-4">
        <h2 className="text-center mb-4">Enroll in Courses</h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Course</th>
                <th>Course Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {eligibleCourses.length === 0 ? (
                <tr>
                  <td colSpan="3">No courses available for enrollment.</td>
                </tr>
              ) : (
                eligibleCourses.map(course => (
                  <tr key={course.course_id}>
                    <td>{course.course} </td>
                    <td>{course.course_name}</td>
                    <td>
                      {enrolledCourses.includes(course.course_id) ? (
                        <button 
                          className="btn"
                          style={{
                            backgroundColor: "#4CAF50", // Brighter green
                            color: "white",
                            fontWeight: "bold",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "4px"
                          }} 
                          disabled
                        >
                          Enrolled
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleEnroll(course.course_id)} 
                          className="btn btn-primary"
                        >
                          Enroll
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-3">
          <button 
            className="btn btn-success" 
            onClick={() => navigate('/Program')}
          >
            Done
          </button>
        </div>
      </div>

      
    </div>
  );
}

export default EnrollCourses;