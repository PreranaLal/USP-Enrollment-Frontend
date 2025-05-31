import React, { useState, useEffect } from "react";
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
  const [showStudentDetails, setShowStudentDetails] = useState(false); // NEW
  const [holdUpdating, setHoldUpdating] = useState(false);
  const [editHoldType, setEditHoldType] = useState("");
  const [editIsHold, setEditIsHold] = useState("");
  const [allStudents, setAllStudents] = useState([]); // NEW

  // Fetch all students on mount
  useEffect(() => {
    axios
      .get("http://localhost:4149/api/students")
      .then((res) => setAllStudents(res.data))
      .catch(() => setError("Could not load students list."));
  }, []);

  // Loads a single student (used by both search and view button)
  const loadStudentById = async (id) => {
    setError("");
    setStudent(null);
    setServicesData([]);
    setFinanceData([]);
    setShowServices(false);
    setShowStudentDetails(true); // Show details when viewing student
    try {
      const studentRes = await axios.get(`http://localhost:4149/api/student/by-id/${id}`);
      setStudent(studentRes.data);
      setEditIsHold(studentRes.data.is_hold === "Yes" ? "Yes" : "No");
      setEditHoldType(studentRes.data.hold_type || "");
      const financeRes = await axios.get(`http://localhost:4149/api/finances/${id}`);
      setFinanceData(financeRes.data);
    } catch (err) {
      setError("Student or finance data not found.");
    }
  };

  // Search for student by student ID
  const handleSearch = async (e) => {
    e.preventDefault();
    if (studentId) {
      loadStudentById(studentId);
    }
  };

  // Toggle show/hide services
  const handleShowServices = async () => {
    if (!showServices) {
      try {
        const id = student ? student.id : studentId;
        const servicesRes = await axios.get(`http://localhost:4149/api/services/${id}`);
        setServicesData(servicesRes.data);
        setEditableServices(servicesRes.data);
        setShowServices(true);
      } catch (err) {
        setError("Could not fetch student services.");
      }
    } else {
      setShowServices(false);
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

  // Toggle is_hold for student
  const handleToggleHold = async () => {
    if (!student) return;
    setHoldUpdating(true);
    try {
      const newHoldValue = student.is_hold === "Y" ? "N" : "Y";
      // Update on backend
      await axios.put(
        `http://localhost:4149/api/student/${student.id}/hold`,
        { is_hold: newHoldValue }
      );
      // Update local state
      setStudent((prev) => ({
        ...prev,
        is_hold: newHoldValue,
      }));
    } catch (err) {
      setError("Failed to update hold status.");
    }
    setHoldUpdating(false);
  };

  // When student is loaded, set edit fields
  React.useEffect(() => {
    if (student) {
      setEditIsHold(student.is_hold === "Yes" ? "Yes" : "No");
      setEditHoldType(student.hold_type || "");
    }
  }, [student]);

  // Update both is_hold and hold_type
  const handleUpdateHold = async () => {
    if (!student) return;
    setHoldUpdating(true);
    try {
      await axios.put(
        `http://localhost:4149/api/student/hold/${student.id}`,
        {
          is_hold: editIsHold,
          hold_type: editHoldType,
        }
      );
      setStudent((prev) => ({
        ...prev,
        is_hold: editIsHold,
        hold_type: editHoldType,
      }));
    } catch (err) {
      setError("Failed to update hold status or type.");
    }
    setHoldUpdating(false);
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

        {/* All Students Table */}
        {allStudents.length > 0 && (
          <div className="table-responsive mb-4">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>View Student</th>
                </tr>
              </thead>
              <tbody>
                {allStudents.map((stu) => (
                  <tr key={stu.id}>
                    <td>{stu.id}</td>
                    <td>{stu.first_name} {stu.last_name}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="info"
                        onClick={() => {
                          if (student && showStudentDetails && student.id === stu.id) {
                            // Hide details if already showing for this student
                            setShowStudentDetails(false);
                            setStudent(null);
                            setFinanceData([]);
                            setServicesData([]);
                            setEditableServices([]);
                          } else {
                            // Show details for this student
                            loadStudentById(stu.id);
                            setShowStudentDetails(true);
                          }
                        }}
                      >
                        {(student && showStudentDetails && student.id === stu.id)
                          ? "Hide Student Details"
                          : "View Student Details"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Student & Finance Table */}
        {student && showStudentDetails && (
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <span>Student Details</span>
              
            </div>
            <div className="card-body">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Name:</th>
                    <td>{student.first_name} {student.last_name}</td>
                  </tr>
                  <tr>
                    <th>Program:</th>
                    <td>{student.program_name || "Not assigned"}</td>
                  </tr>
                  <tr>
                    <th>Is Hold:</th>
                    <td>
                      <select
                        value={editIsHold}
                        onChange={(e) => setEditIsHold(e.target.value)}
                        className="form-select d-inline-block"
                        style={{ width: "auto" }}
                        disabled={holdUpdating}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Hold Type:</th>
                    <td>
                      <input
                        type="text"
                        className="form-control d-inline-block"
                        style={{ width: "auto" }}
                        value={editHoldType}
                        onChange={(e) => setEditHoldType(e.target.value)}
                        placeholder="Enter hold type"
                        disabled={holdUpdating}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <Button
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={handleUpdateHold}
                disabled={holdUpdating}
              >
                Update Hold Status & Type
              </Button>
              <Button
                variant="info"
                className="ms-2"
                onClick={handleShowServices}
              >
                {showServices ? "Hide Student Services" : "Show Student Services"}
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