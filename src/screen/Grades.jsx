import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function Grades() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [grades, setGradesData] = useState([]);
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
          // Fetch finance details only for students (role_id = 3)
          axios
                    .get(`http://localhost:4149/api/grades/${studentId}`)
            .then((response) => {
                setGradesData(response.data);
                
                setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching Grade Data:", error);
              setError("Failed to fetch Grade Data.");
              setLoading(false);
            });
        } else {
          // Redirect staff users to their dashboard (if implemented)
          navigate("/staff-dashboard");
        }
      }, [navigate]);

    // Handle Logout
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
            

        

            {/* Grades Table */}
            <div className="container mt-4">
                <h2 className="text-center mb-4">My Grades</h2>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Year</th>
                                <th>Semester</th>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.length > 0 ? (
                                grades.map((grade) => (
                                    <tr key={grade.id}> {/* use the correct id */}
                                        <td>{grade.year}</td>
                                        <td>{grade.semester}</td>
                                        <td>{grade?.course_code}</td>
                                        <td>{grade?.course_name}</td>
                                        <td>{grade.grade}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No grades available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            
        </div>
    );
}

export default Grades;
