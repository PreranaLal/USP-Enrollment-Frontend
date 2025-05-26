import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function StudentForms() {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h2 className="mb-4">Student Forms</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <Button variant="link" onClick={() => navigate("/dashboard")}>
            Grade Recheck Form
          </Button>
        </li>
        <li className="list-group-item">
          <Button variant="link" onClick={() => navigate("/dashboard")}>
            Agrotat Pass Form
          </Button>
        </li>
        <li className="list-group-item">
          <Button variant="link" onClick={() => navigate("/dashboard")}>
            Compassionate Pass Form
          </Button>
        </li>
        <li className="list-group-item">
          <Button variant="link" onClick={() => navigate("/dashboard")}>
            Examination Resit Request Form
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default StudentForms;