import React, { useState } from 'react';
import axios from 'axios';
import './SimpleForm.css';
import { Link, useNavigate } from 'react-router-dom';

const SimpleForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        place: '',
        college: '',
        password: '',
        confirmPassword: ''
    });

    const [serverResponse, setServerResponse] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.place) newErrors.place = 'Place is required';
        if (!formData.college) newErrors.college = 'College is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:4000/submit', formData);
                console.log(response);
                setServerResponse(response.data);
                alert("User registered successfully")
                navigate('/');
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Error submitting form');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <>
        <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label>Place:</label>
                    <input type="text" name="place" value={formData.place} onChange={handleChange} />
                    {errors.place && <span>{errors.place}</span>}
                </div>
                <div>
                    <label>College:</label>
                    <input type="text" name="college" value={formData.college} onChange={handleChange} />
                    {errors.college && <span>{errors.college}</span>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <button type="submit">Submit</button>
                <p>Alreay a user <Link to="/login">Login</Link></p>
            </form>
            
            {serverResponse && (
                <div className="server-response">
                    <h3>Server Response: {serverResponse.message}</h3>
                </div>
            )}
        </>
    );
};

export default SimpleForm;
