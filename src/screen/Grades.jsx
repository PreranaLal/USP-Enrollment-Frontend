import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from "jspdf";

function Grades() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [grades, setGradesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          navigate("/login");
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // 1. Fetch student object using user id
        axios
          .get(`http://localhost:4149/api/student/${parsedUser.id}`)
          .then((response) => {
            setStudentData(response.data);
            const studentId = response.data.id;

            // 2. Fetch services using student id
            axios
              .get(`http://localhost:4149/api/services/${studentId}`)
              .then((res) => {
                setServices(res.data);
                // Check if "View Grades" is available
                const canViewGrades = res.data.some(
                  (service) => service.service_id === "v_grade" && service.service_available === "Y"
                );
                if (!canViewGrades) {
                  setError("You do not have access to view grades.");
                  setLoading(false);
                  return;
                }

                if (parsedUser.role_id === 3) {
                  // 3. Fetch grades using student id
                  axios
                    .get(`http://localhost:4149/api/grades/${studentId}`)
                    .then((response) => {
                      setGradesData(response.data);
                      setLoading(false);
                    })
                    .catch((error) => {
                      setError("Failed to fetch Grade Data.");
                      setLoading(false);
                    });
                } else {
                  navigate("/staff-dashboard");
                }
              })
              .catch(() => {
                setError("Failed to fetch student services.");
                setLoading(false);
              });
          })
          .catch(() => {
            setError("Failed to fetch student details.");
            setLoading(false);
          });
      }, [navigate]);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };  

    

    const generatePDF = () => {
        if (grades.length === 0) {
            alert("No grades available to generate a transcript.");
            return;
        }

        const doc = new jsPDF();
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Student Transcript", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.text(`Student Name: ${user?.name}`, 20, 40);
        doc.text(`Student ID: ${user?.id}`, 20, 50);
        
        doc.setFont("helvetica", "normal");
        // doc.text(`Year: ${Year}`, 20, 70);

        let yPos = 90;
        grades.forEach((grade) => {
            doc.text(`${grade.course_code} - ${grade.course_name}: ${grade.grade}`, 20, yPos);
            yPos += 10;
        });

        doc.save(`Transcript_${grades.year}.pdf`);
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
                    <button className="btn btn-primary mt-3" onClick={generatePDF}>
                        Download Transcript
                    </button>

                </div>
            </div>

            
        </div>
    );
}

export default Grades;
