import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./screen/Login";  // Corrected path
import Signup from "./screen/Signup";  // Corrected path
import Dashboard from "./screen/Dashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Screen/Login" element={<Login />} />
        <Route path="/Screen/Signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

