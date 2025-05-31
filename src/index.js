// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ManageStudents from './screen/ManageStudents';
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
import StudentForms from './screen/StudentForms';
import GradeRecheckSAS from './screen/GradeRecheckSAS';
import StudentGradeRecheck from './screen/StudentGradeRecheck';
import GradeRecheckById from './screen/GradeRecheckById';
import Form from './screen/Form';
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
      <Route path="/Forms" element={<Layout title="Forms"><Form /></Layout>} />
      <Route path="/Program_Requirements" element={<Layout title="Program Requirements"><ProgramRequirements /></Layout>} />
      <Route path="/Course_Enroll" element={<Layout title="Enrollment"><Enroll /></Layout>} />
      <Route path="/ManageStudents" element={<Layout title="Manage Students"><ManageStudents /></Layout>} />
      <Route path="/SASGrades" element={<Layout><GradeRecheckSAS /></Layout>} />
      <Route path="/GradeRecheckById" element={<Layout title="temp"><GradeRecheckById /></Layout>} />
      <Route path="/StudentGradeRecheck" element={<Layout><StudentGradeRecheck /></Layout>} />
      <Route path="/StudentForms" element={<Layout title="Student Forms"><StudentForms /></Layout>} />
      <Route path="/Form" element={<Layout><Form /></Layout>} />
      <Route path="/Login" element={<Layout showNavbar={false} title="Login"><Login /></Layout>} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
