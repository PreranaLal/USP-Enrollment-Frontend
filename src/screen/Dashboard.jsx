import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [staffData, setStaffData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [helloMessage, setHelloMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // Redirect to login if no user is found
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.role_id === 3) {
      // Fetch student details
      axios.get(`http://localhost:4149/api/student/${parsedUser.id}`)
        .then(response => {
          setStudentData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching student data:", error);
          setError("Failed to fetch student data.");
          setLoading(false);
        });

    } else if (parsedUser.role_id === 2) {
      // Fetch staff details
      axios.get(`http://localhost:4149/api/staff/${parsedUser.id}`)
        .then(response => {
          setStaffData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching staff data:", error);
          setError("Failed to fetch staff data.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleHello = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/hello");
      setHelloMessage(response.data.message);
    } catch (error) {
      console.error("Error calling microservice:", error);
      alert("Failed to connect to the microservice.");
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return <div className="alert alert-danger text-center mt-3">{error}</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Student Information Card */}
      {studentData && (
        <div className="container my-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              Welcome {studentData.first_name} {studentData.last_name}
            </div>
            <div className="card-body">
              <p>
                <strong>ID:</strong> {studentData.id}
              </p>
              <p>
                <strong>First Name:</strong> {studentData.first_name}
              </p>
              <p>
                <strong>Last Name:</strong> {studentData.last_name}
              </p>
              <p>
                <strong>Date of Birth:</strong> {new Date(studentData.dob).toLocaleDateString('en-GB')}
              </p>
              <p>
                <strong>Email:</strong> {studentData.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {studentData.phone || "N/A"}
              </p>
              <p>
                <strong>Program:</strong> {studentData?.program_name || "Not assigned"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Staff Information Card */}
      {staffData && (
        <div className="container my-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              Welcome {staffData.first_name} {staffData.last_name}
            </div>
            <div className="card-body">
              <p><strong>ID:</strong> {staffData.id}</p>
              <p><strong>First Name:</strong> {staffData.first_name}</p>
              <p><strong>Last Name:</strong> {staffData.last_name}</p>
              <p><strong>Email:</strong> {staffData.email}</p>
              <p><strong>Phone:</strong> {staffData.phone}</p>
              <p><strong>Department:</strong> {staffData.department}</p>
              <p><strong>Position:</strong> {staffData.position}</p>
              
            </div>
          </div>
        </div>
      )}
      <a
  className="btn btn-link nav-item"
  href="http://localhost:5000/grade-recheck"
  target="_blank"
  rel="noopener noreferrer"
>
  Grade Recheck Form
</a>
    </div>
  );
}

export default Dashboard;
