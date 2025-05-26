import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function ManageStudents() {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [financeData, setFinanceData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [editableServices, setEditableServices] = useState([]);
  const [error, setError] = useState("");
  const [showServices, setShowServices] = useState(false);

  // Search for student by student ID
  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setStudent(null);
    setFinanceData([]);
    setServicesData([]);
    setShowServices(false); // Hide services table on new search
    try {
      // Fetch student details
      const studentRes = await axios.get(`http://localhost:4149/api/student/by-id/${studentId}`);
      setStudent(studentRes.data);

      // Fetch finance details
      const financeRes = await axios.get(`http://localhost:4149/api/finances/${studentId}`);
      setFinanceData(financeRes.data);
    } catch (err) {
      setError("Student or finance data not found.");
    }
  };

  const handleShowServices = async () => {
    try {
      const servicesRes = await axios.get(`http://localhost:4149/api/services/${studentId}`);
      setServicesData(servicesRes.data);
      setEditableServices(servicesRes.data); // Initialize editableServices
      setShowServices(true);
    } catch (err) {
      setError("Could not fetch student services.");
    }
  };

  const handleServiceToggle = async (idx) => {
    const updatedServices = editableServices.map((service, i) =>
      i === idx
        ? { ...service, service_available: service.service_available === "Y" ? "N" : "Y" }
        : service
    );
    setEditableServices(updatedServices);

    // Get the toggled service
    const toggledService = updatedServices[idx];
    try {
      await axios.put(
        `http://localhost:4149/api/services/${studentId}/${toggledService.service_id}`,
        { service_available: toggledService.service_available }
      );
      // Optionally, update servicesData or show a success message
    } catch (err) {
      setError("Failed to update service availability.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      

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
              <Button variant="info" onClick={handleShowServices}>
                Show Student Services
              </Button>
            </div>
          </div>
        )}
        {showServices && servicesData.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Service Name</th>
                  <th>Available</th>
                  <th>Selected</th>
                </tr>
              </thead>
              <tbody>
                {editableServices.map((service, idx) => (
                  <tr key={idx}>
                    <td>{service.service_name}</td>
                    <td>{service.service_available === "Y" ? "Yes" : "No"}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={service.service_available === "Y"}
                        onChange={() => handleServiceToggle(idx)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  {/* <th>Balance</th> */}
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
                    {/* <td>{record.balance}</td> */}
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

      
    </div>
  );
}

export default ManageStudents;