// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from './screen/Dashboard';
import Layout from './screen/Layout';
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
      <Route path="/Dashboard" element={<Layout><Dashboard /></Layout>} />
      {/* Route for Program */}
      <Route path="/Program" element={<Layout title="My Courses"><Program /></Layout>} />
      <Route path="/Grades" element={<Layout title="My Grades"><Grades /></Layout>} />
      <Route path="/Finances" element={<Layout title="My Finances"><Finances /></Layout>} />
      <Route path="/Program_Requirements" element={<Layout title="Program Requirements"><ProgramRequirements /></Layout>} />
      <Route path="/Course_Enroll" element={<Layout title="Enrollment"><Enroll /></Layout>} />
      <Route path="/Login" element={<Layout showNavbar={false} title="Login"><Login /></Layout>} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
