import React from "react";
// import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";
const Layout = ({ children, handleLogout, showNavbar = true, title = "Dashboard"}) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header showLogout={showNavbar} title={title}/>
      {showNavbar && <Navbar />}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout; // ✅ Ensure default export
