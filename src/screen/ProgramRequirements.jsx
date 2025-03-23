import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

function ProgramRequirements() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTree, setShowTree] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.role_id === 3) {
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
      navigate("/staff-dashboard");
    }
  }, [navigate]);


  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  const getYear = (course) => {
    const match = course.course.match(/\d/);
    return match ? parseInt(match[0]) : null;
  };

  const generateNodesAndEdges = () => {
    let nodes = [];
    let edges = [];
    let yearPositions = { 1: 0, 2: 0, 3: 0 };

    // Root node for the program name
    nodes.push({
      id: "program",
      data: { label: user?.program_name || "Program" },
      position: { x: 300, y: -50 },
      style: { background: "#17a2b8", color: "white", padding: "10px", borderRadius: "5px", fontWeight: "bold" },
    });

    courses.forEach((course) => {
      const year = getYear(course);
      if (!year) return;

      let color =
        course.status === "Completed" ? "#28a745" : // Green
        course.status === "Enrolled" ? "#007bff" : // Blue
        course.status === "Pending" ? "#ffc107" : // Yellow
        "#dc3545"; // Red (Prerequisite Not Met)

      // Create course nodes by academic year
      let xOffset = yearPositions[year] * 200;
      let yOffset = year * 150;
      nodes.push({
        id: course.course,
        data: { label: `${course.course} - ${course.course_name}` },
        position: { x: xOffset, y: yOffset },
        style: { background: color, color: "white", padding: "10px", borderRadius: "5px" },
      });

      yearPositions[year]++;

      // Connect Year 1 courses to program
      if (year === 1) {
        edges.push({
          id: `edge-program-${course.course}`,
          source: "program",
          target: course.course,
          animated: true,
          style: { stroke: "#333" },
        });
      }

      // Connect courses to prerequisites
      if (course.prerequisite_course) {
        edges.push({
          id: `edge-${course.prerequisite_course}-${course.course}`,
          source: course.prerequisite_course,
          target: course.course,
          animated: true,
          style: { stroke: "#555" },
        });
      }
    });

    return { nodes, edges };
  };

  const { nodes, edges } = generateNodesAndEdges();

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
    <div className="container mt-4">
      <h2 className="text-center mb-4">Program Requirements</h2>
      
      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={() => setShowTree(!showTree)}>
          {showTree ? "Show Table View" : "Show Tree View"}
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading courses...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : showTree ? (
        <div style={{ height: "500px", border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      ) : (
        <>
          <h3 className="text-center">Year 1 Courses</h3>
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
              {courses.filter(c => getYear(c) === 1).map((course, index) => (
                <tr key={index}>
                  <td>{course.course}</td>
                  <td>{course.course_name}</td>
                  <td>{course.prerequisite_course || 'None'}</td>
                  <td>
                    <span className={`badge 
                      ${course.status === 'Completed' ? 'bg-success' : 
                      course.status === 'Enrolled' ? 'bg-info' : 
                      course.status === 'Pending' ? 'bg-warning' : 
                      course.status === 'Prerequisite Not Met' ? 'bg-danger' : 
                      'bg-secondary'}`}>{course.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-center">Year 2 Courses</h3>
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
              {courses.filter(c => getYear(c) === 2).map((course, index) => (
                <tr key={index}>
                  <td>{course.course}</td>
                  <td>{course.course_name}</td>
                  <td>{course.prerequisite_course || 'None'}</td>
                  <td>
                    <span className={`badge 
                      ${course.status === 'Completed' ? 'bg-success' : 
                      course.status === 'Enrolled' ? 'bg-info' : 
                      course.status === 'Pending' ? 'bg-warning' : 
                      course.status === 'Prerequisite Not Met' ? 'bg-danger' : 
                      'bg-secondary'}`}>{course.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table><h3 className="text-center">Year 3 Courses</h3>
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
              {courses.filter(c => getYear(c) === 3).map((course, index) => (
                <tr key={index}>
                  <td>{course.course}</td>
                  <td>{course.course_name}</td>
                  <td>{course.prerequisite_course || 'None'}</td>
                  <td>
                    <span className={`badge 
                      ${course.status === 'Completed' ? 'bg-success' : 
                      course.status === 'Enrolled' ? 'bg-info' : 
                      course.status === 'Pending' ? 'bg-warning' : 
                      course.status === 'Prerequisite Not Met' ? 'bg-danger' : 
                      'bg-secondary'}`}>{course.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </>
      )}
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

export default ProgramRequirements;
