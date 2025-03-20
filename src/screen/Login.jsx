import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for sending requests

const Login = () => {
  const navigate = useNavigate();
  
  // States for form fields & error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error messages

  // 🔑 Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await axios.post(
        "http://localhost:4149/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response Data:", response.data); // Debugging

      if (response.data.user) {
        // ✅ Store user info (if needed)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // ✅ Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <div className="bg-primary text-white p-3 d-flex align-items-center">
        <img
          src="/USP_Logo.png" // ✅ Ensure correct path
          alt="USP Logo"
          style={{ width: "50px", height: "50px", marginRight: "8px" }}
        />
        <h3 className="mb-0">Login</h3>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-nav">
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/dashboard')}>Home</button>
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/program')}>My Courses</button>
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/finances')}>My Finances</button>
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/grades')}>My Grades</button>
          <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/requirements')}>Program Requirements</button>
        </div>
      </nav>

      {/* Login Form */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center">Login</h3>

                {/* Display error message */}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Update state
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Update state
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Login</button>
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
};

export default Login;
