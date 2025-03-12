// Program.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Program() {
    const navigate = useNavigate(); // Hook for navigation
  // Dummy state for demonstration. In a real app, this data would come from authentication or an API.
  const [user, setUser] = useState({
    isLoggedIn: false,
    firstName: 'User', // default value; changes to 'John' when logged in.
    lastName: 'Doe',
    program: 'Computer Science',
    major: 'Software Engineering',
    minor: 'Mathematics'
  });

  // Toggle login state to mimic the behavior in Dashboard.js.
  const handleLoginLogout = () => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: !prev.isLoggedIn,
      firstName: prev.isLoggedIn ? 'User' : 'John'
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-primary text-white p-3 d-flex align-items-center">
        <img
          src="./USP_Logo.png" // adjust the path accordingly
          alt="Logo"
          style={{ width: '50px', height: '50px', marginRight: '8px' }}
        />
        <h3 className="mb-0">Dashboard</h3>
      </div>

      {/* Navigation Bar (same as Dashboard.js) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-nav">
        <button
            className="btn btn-link nav-item nav-link"
            onClick={() => navigate('/Dashboard')}
          >
            Home
          </button>
          {/* Redirect to Program */}
          <button
            className="btn btn-link nav-item nav-link"
            onClick={() => navigate('/Program')}
          >
            My Courses
          </button>
          <button className="btn btn-link nav-item nav-link">My Finances</button>
          <button className="btn btn-link nav-item nav-link">My Grades</button>
          <button className="btn btn-link nav-item nav-link">Program Requirements</button>
        </div>
        <div className="ml-auto">
          <button className="btn btn-outline-primary" onClick={handleLoginLogout}>
            {user.isLoggedIn ? 'Log Out' : 'Log In'}
          </button>
        </div>
      </nav>

      {/* Body Section: Program Details */}
      <div className="container my-4">
        <div className="card">
          <div className="card-header">Program Details</div>
          <div className="card-body">
            {/* Outer Border */}
            <div className="border p-3">
              {/* Inner Border */}
              <div className="border p-3">
                <table className="table table-striped table-bordered mb-0">
                  <tbody>
                    <tr>
                      <td><strong>Student Name</strong></td>
                      <td>{user.firstName} {user.lastName}</td>
                    </tr>
                    <tr>
                      <td><strong>Program</strong></td>
                      <td>{user.program}</td>
                    </tr>
                    <tr>
                      <td><strong>Major I</strong></td>
                      <td>{user.major}</td>
                    </tr>
                    <tr>
                      <td><strong>Minor</strong></td>
                      <td>{user.minor}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (same as Dashboard.js) */}
      <footer className="bg-primary text-white p-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 border-right">
              Disclaimer & Copyright | Contact US
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

export default Program;
