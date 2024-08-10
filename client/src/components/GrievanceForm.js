import React, { useState } from 'react';
import axios from 'axios';

const GrievanceForm = () => {
    const [formData, setFormData] = useState({
        type: '',
        description: ''
    });

    const { type, description } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/grievance/submit`, formData, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            console.log(res.data);
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="grievance-form">
            <h2>Submit Grievance</h2>
            <form onSubmit={onSubmit}>
                <select name="type" value={type} onChange={onChange} required>
                    <option value="">Select Grievance Type</option>
                    <option value="Service Issue">Service Issue</option>
                    <option value="Billing Issue">Billing Issue</option>
                    <option value="Other">Other</option>
                </select>
                <textarea
                    name="description"
                    value={description}
                    onChange={onChange}
                    placeholder="Describe your grievance"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default GrievanceForm;
