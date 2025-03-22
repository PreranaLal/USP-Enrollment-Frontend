import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProgramRequirements() {
  const navigate = useNavigate();
  const studentId = 3; // Replace with dynamic student ID if needed
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4149/api/eligible-courses/${studentId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [studentId]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="bg-primary text-white p-3 d-flex align-items-center">
        <img
          src="./USP_Logo.png"
          alt="Logo"
          style={{ width: '50px', height: '50px', marginRight: '8px' }}
        />
        <h3 className="mb-0">Dashboard</h3>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-nav">
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Dashboard')}>Home</button>
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Program')}>My Courses</button>
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Finances')}>My Finances</button>
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Grades')}>My Grades</button>
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Program_Requirements')}>Program Requirements</button>
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
      <th>Course Name</th> {/* Add column for course name */}
      <th>Prerequisite</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {courses.length > 0 ? (
      courses.map((course, index) => (
        <tr key={index}>
          <td>{course.course}</td>
          <td>{course.course_name}</td> {/* Display course name */}
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
        <td colSpan="4" className="text-center">No course data available</td> {/* Adjust colspan */}
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
