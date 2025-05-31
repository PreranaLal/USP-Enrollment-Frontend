import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function ManageStudents() {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [financeData, setFinanceData] = useState([]);
  const [error, setError] = useState("");
  const [servicesData, setServicesData] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setStudent(null);
    setServicesData([]);
    setFinanceData([]);
    try {
      // Fetch student details
      const studentRes = await axios.get(`http://localhost:4149/api/student/by-id/${studentId}`);
      setStudent(studentRes.data);

    
    } catch (err) {
        setError("Student data not found.");
    }
    try {
      
      // Fetch finance details
      const financeRes = await axios.get(`http://localhost:4149/api/finances/${studentId}`);
      setFinanceData(financeRes.data);
    
    } catch (err) {
        setError("finance data not found.");
    }
    try {
      
        const servicesRes = await axios.get(`http://localhost:5000/api/services/${studentId}`);
        setServicesData(servicesRes.data);
    } catch (err) {
        setError("services data not found.");
    }
  };
  
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
          <h3 className="mb-0">ManageServices</h3>
        </div>
      </div>

      <div className="container my-4">
        {/* Search Box */}
        <form className="mb-4" onSubmit={handleSearch}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </div>
        </form>
        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        {/* Student & Finance Table */}
        {student && (
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
              Student Details
            </div>
            <div className="card-body">
              <p>
                <strong>Name:</strong> {student.first_name} {student.last_name}
              </p>
              <p>
                <strong>Program:</strong> {student.program_name || "Not assigned"}
                

              </p>
            </div>
          </div>
        )}

        {financeData.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Invoice Number</th>
                  <th>Status</th>
                  <th>Year</th>
                  <th>Balance</th>
                  <th>Semester</th>
                  <th>Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {financeData.map((record, idx) => (
                  <tr key={idx}>
                    <td>{record.invoice_number}</td>
                    <td>{record.status}</td>
                    <td>{record.year}</td>
                    <td>{record.balance}</td>
                    <td>{record.semester}</td>
                    <td>{record.payment_date ? new Date(record.payment_date).toLocaleDateString() : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {student && financeData.length === 0 && (
          <div className="alert alert-warning text-center">
            No finance data found for this student.
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white p-3 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6 border-right">
              Disclaimer &amp; Copyright | Contact Us
            </div>
            <div className="col-md-6 text-md-right">
              University of the South Pacific, Laucala Campus, Suva, Fiji, Tel: +679 3231000
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ManageStudents;