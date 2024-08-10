import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import GrievanceForm from './components/GrievanceForm';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/grievance" element={<GrievanceForm />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
