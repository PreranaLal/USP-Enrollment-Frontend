import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function Grades() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [grades, setGradesData] = useState([]);
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
          // Fetch finance details only for students (role_id = 3)
          axios
            .get(`http://localhost:4149/api/grades/${parsedUser.id}`)
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
                <div className="navbar-nav">
                    <button
                        className="btn btn-link nav-item nav-link"
                        onClick={() => navigate('/Dashboard')}
                    >
                        Home
                    </button>
                    <button
                        className="btn btn-link nav-item nav-link"
                        onClick={() => navigate('/Program')}
                    >
                        My Courses
                    </button>
                    <button
                        className="btn btn-link nav-item nav-link"
                        onClick={() => navigate('/Finances')}
                    >
                        My Finances
                    </button>
                    <button
                        className="btn btn-link nav-item nav-link"
                        onClick={() => navigate('/Grades')}
                    >
                        My Grades
                    </button>
                    <button
                        className="btn btn-link nav-item nav-link"
                        onClick={() => navigate('/Program_Requirements')}
                    >
                        Program Requirements
                    </button>
                </div>
            </nav>

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

export default Grades;
