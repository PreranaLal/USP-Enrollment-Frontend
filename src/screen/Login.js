import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    navigate("/dashboard"); // Redirect to Dashboard after login
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-primary text-white p-3 d-flex align-items-center">
        <img
          src="./USP_Logo.png" // Adjust the path accordingly
          alt="Logo"
          style={{ width: '50px', height: '50px', marginRight: '8px' }}
        />
        <h3 className="mb-0">Login</h3>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-nav">
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/dashboard')}>Home</button>
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/program')}>My Courses</button>
          <button className="btn btn-link nav-item nav-link">My Finances</button>
          <button className="btn btn-link nav-item nav-link">My Grades</button>
          <button className="btn btn-link nav-item nav-link">
            Program Requirements
          </button>
        </div>
      </nav>

      {/* Login Form */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>
                <p className="mt-3 text-center">
                  Don't have an account? <a href="/Screen/signup">Sign up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
};

export default Login;
