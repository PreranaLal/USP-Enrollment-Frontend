import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const roleId = user.role_id;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="navbar-nav">
          <button
            className="btn btn-link nav-item nav-link"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </button>
          {roleId === 3 && (
            <>
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
              <button
                className="btn btn-link nav-item nav-link"
                onClick={() => navigate("/StudentGradeRecheck")}
              >
                Grade Recheck Form
              </button>
            </>
          )}
          {roleId === 2 && (
            <>
              <button
                className="btn btn-link nav-item nav-link"
                onClick={() => navigate("/ManageStudents")}
              >
                Manage Students
              </button>
              <button
                className="btn btn-link nav-item nav-link"
                onClick={() => navigate("/SASGrades")}
              >
                Grade Recheck Forms
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;