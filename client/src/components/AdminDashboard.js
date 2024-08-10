import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [grievances, setGrievances] = useState([]);

    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/grievance/all`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                });
                setGrievances(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };
        fetchGrievances();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_API_URL}/grievance/status/${id}`,
                { status },
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                }
            );
            setGrievances(
                grievances.map(grievance =>
                    grievance._id === id ? { ...grievance, status: res.data.status } : grievance
                )
            );
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <ul>
                {grievances.map(grievance => (
                    <li key={grievance._id}>
                        <p>
                            <strong>{grievance.type}</strong>: {grievance.description}
                        </p>
                        <p>Status: {grievance.status}</p>
                        <button onClick={() => updateStatus(grievance._id, 'In Progress')}>In Progress</button>
                        <button onClick={() => updateStatus(grievance._id, 'Resolved')}>Resolved</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
