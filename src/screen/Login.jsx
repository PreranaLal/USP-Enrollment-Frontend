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

        
      </div>
    );
  };

  export default Login;