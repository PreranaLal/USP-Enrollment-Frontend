// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from './screen/Dashboard';

import Program from './screen/Program';
import Login from './screen/Login';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Grades from './screen/Grades';
import Finances from './screen/Finances';
import ProgramRequirements from './screen/ProgramRequirements';
import Enroll from './screen/EnrollCourses';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/Dashboard" />} />
      {/* Route for Dashboard */}
      <Route path="/Dashboard" element={<Dashboard />} />
      {/* Route for Program */}
      <Route path="/Program" element={<Program />} />
      <Route path="/Grades" element={<Grades />} />
      <Route path="/Finances" element={<Finances />} />
      <Route path="/Program_Requirements" element={<ProgramRequirements />} />
      <Route path="/Course_Enroll" element={<Enroll />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
