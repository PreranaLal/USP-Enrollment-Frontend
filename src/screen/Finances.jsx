import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Finances() {
    // Dummy state for user login demo.
    const navigate = useNavigate(); // Hook for navigation
    const [user, setUser] = useState({
        isLoggedIn: false,
        id: '123456',
        firstName: 'User',
        lastName: 'Doe',
        dob: '1990-01-01',
        email: 'user@example.com',
        phone: '+1234567890',
        program: 'Computer Science'
    });

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
                    <button
                        className="btn btn-link nav-item nav-link"
                        onClick={() => navigate('/Dashboard')}
                    >
                        Home
                    </button>
                    <button
                        className="btn btn-link nav-item nav-link"
                        onClick={() => navigate('/Program')}
                    >
                        My Courses
                    </button>
                    <button
                        className="btn btn-link nav-item nav-link"
                        onClick={() => navigate('/Finances')}
                    >
                        My Finances
                    </button>
                    <button
                        className="btn btn-link nav-item nav-link"
                        onClick={() => navigate('/Grades')}
                    >
                        My Grades
                    </button>
                    <button
                        className="btn btn-link nav-item nav-link"
                        onClick={() => navigate('/Program_Requirements')}
                    >
                        Program Requirements
                    </button>
                </div>
                <div className="ml-auto">
                    <button className="btn btn-outline-primary" onClick={handleLoginLogout}>
                        {user.isLoggedIn ? 'Log Out' : 'Log In'}
                    </button>
                </div>
            </nav>

            {/* Student Fee Invoices */}
            <div className="container mt-4">
                <h2 className="text-center mb-4">Student Fee Invoices</h2>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Year</th>
                                <th>Semester</th>
                                <th>Invoice Number</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2024</td>
                                <td>Semester 1</td>
                                <td>INV-202401</td>
                                <td>$2,500</td>
                                <td className="text-success">Paid</td>
                            </tr>
                            <tr>
                                <td>2023</td>
                                <td>Semester 2</td>
                                <td>INV-202302</td>
                                <td>$2,400</td>
                                <td className="text-danger">Unpaid</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Student Holds */}
            <div className="container mt-4">
                <h2 className="text-center mb-4">Student Holds</h2>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Hold Type</th>
                                <th>Reason</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Financial Hold</td>
                                <td>Outstanding Tuition Fees</td>
                                <td className="text-danger">Active</td>
                            </tr>
                            <tr>
                                <td>Library Hold</td>
                                <td>Overdue Book Returns</td>
                                <td className="text-warning">Pending</td>
                            </tr>
                        </tbody>
                    </table>
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
}

export default Finances;
