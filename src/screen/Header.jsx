import React from "react";
import { useNavigate } from "react-router-dom";
const Header = ({showLogout, title = "Dashboard"}) => {
    const navigate = useNavigate();
// Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  return (
    <div className="bg-primary text-white p-3 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <img
          src="/USP_Logo.png"
          alt="USP Logo"
          style={{ width: "50px", height: "50px", marginRight: "8px" }}
        />
        <h3 className="mb-0">{title}</h3>
      </div>
      {showLogout && ( /* ✅ Only show button if showLogout is true */
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
