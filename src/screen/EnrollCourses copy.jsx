import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Enroll() {
    const navigate = useNavigate();
    const [selectedCourses, setSelectedCourses] = useState([]);

    const [user, setUser] = useState({
        isLoggedIn: false,
        firstName: 'User', // default value; changes to 'John' when logged in.
        lastName: 'Doe',
        program: 'Computer Science',
        major: 'Software Engineering',
        minor: 'Mathematics'
      });

    // Dummy course data
    const courses = [
        { year: 2024, id: 'CS101', name: 'Introduction to Programming', prerequisite: 'None' },
        { year: 2024, id: 'CS102', name: 'Data Structures', prerequisite: 'CS101' },
        { year: 2024, id: 'CS103', name: 'Computer Architecture', prerequisite: 'None' },
        { year: 2024, id: 'CS104', name: 'Operating Systems', prerequisite: 'CS102' },
        { year: 2024, id: 'CS105', name: 'Database Systems', prerequisite: 'None' }
    ];

    // Handle course selection
    const toggleCourseSelection = (courseId) => {
        setSelectedCourses(prevSelected => 
            prevSelected.includes(courseId) 
                ? prevSelected.filter(id => id !== courseId) 
                : [...prevSelected, courseId]
        );
    };
    
      // Toggle login state for demonstration.
      const handleLoginLogout = () => {
        setUser(prev => ({
          ...prev,
          isLoggedIn: !prev.isLoggedIn,
          firstName: prev.isLoggedIn ? 'User' : 'John' // Change the name when logged in.
        }));
      };

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <div className="bg-primary text-white p-3 d-flex align-items-center">
                <img
                    src="./USP_Logo.png" 
                    alt="Logo"
                    style={{ width: '50px', height: '50px', marginRight: '8px' }}
                />
                <h3 className="mb-0">Dashboard</h3>
            </div>

            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-nav">
                    <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Dashboard')}>Home</button>
                    <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Program')}>My Courses</button>
                    <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Finances')}>My Finances</button>
                    <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Grades')}>
                        My Grades
                    </button>
                    <button className="btn btn-link nav-item nav-link" onClick={() => navigate('/Program_Requirements')}>Program Requirements</button>
                </div>
                <div className="ml-auto">
                    <button className="btn btn-outline-primary" onClick={handleLoginLogout}>
                        {user.isLoggedIn ? 'Log Out' : 'Log In'}
                    </button>
                </div>
            </nav>

            {/* Enrollment Table */}
            <div className="container mt-4">
                <h2 className="text-center mb-4">Enroll in Courses</h2>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Year</th>
                                <th>Course ID</th>
                                <th>Course Name</th>
                                <th>Prerequisite</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course.id}>
                                    <td>{course.year}</td>
                                    <td>{course.id}</td>
                                    <td>{course.name}</td>
                                    <td>{course.prerequisite}</td>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedCourses.includes(course.id)}
                                            onChange={() => toggleCourseSelection(course.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-success mt-3" onClick={() => alert(`Enrolled in: ${selectedCourses.join(', ')}`)}>Enroll</button>
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
}

export default Enroll;