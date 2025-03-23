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

  const filterCoursesByYear = (year) => {
    return courses.filter(course => {
      const match = course.course.match(/\d/);
      return match && parseInt(match[0]) === year;
    });
  };

  const renderTable = (year, title) => {
    const filteredCourses = filterCoursesByYear(year);
    return (
      <div className="mb-4">
        <h3 className="text-center">{title}</h3>
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
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No courses available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  // Convert courses into a tree structure for ReactFlow
  const generateNodesAndEdges = () => {
    let nodes = [];
    let edges = [];

    courses.forEach((course, index) => {
      // Assign colors based on status
      let color = course.status === "Completed" ? "#28a745" :  // Green
                  course.status === "Enrolled" ? "#007bff" :  // Blue
                  course.status === "Pending" ? "#ffc107" :  // Yellow (New)
                  "#dc3545"; // Red for Prerequisite Not Met

      nodes.push({
        id: course.course,
        data: { label: `${course.course} - ${course.course_name}` },
        position: { x: index * 150, y: 0 },
        style: { background: color, color: "white", padding: "10px", borderRadius: "5px" },
      });

      if (course.prerequisite_course) {
        edges.push({
          id: `edge-${course.prerequisite_course}-${course.course}`,
          source: course.prerequisite_course,
          target: course.course,
          animated: true,
          style: { stroke: "#333" },
        });
      }
    });

    return { nodes, edges };
  };

  const { nodes, edges } = generateNodesAndEdges();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Program Requirements</h2>
      
      {/* Toggle Button */}
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
        // Render Tree Diagram
        <div style={{ height: "500px", border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      ) : (
        // Render Table View
        <>
          {renderTable(1, "Year 1 Courses")}
          {renderTable(2, "Year 2 Courses")}
          {renderTable(3, "Year 3 Courses")}
        </>
      )}
    </div>
  );
}

export default ProgramRequirements;
