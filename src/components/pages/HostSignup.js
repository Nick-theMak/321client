import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Button } from '@mui/material';
import { api } from "../networking/api";
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/icon/icon.js';
import './StudentLoginScreen.css';

function HostSignupScreen() {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        school: ''
    }); // State to manage form data

    // Handler for form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handler for form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Prepare teacher data for API request
        const teacherData = {
            email: formData.email,
            username: formData.username,
            password: formData.password,
            school: formData.school
        };

        try {
            const response = await api.post('/user/teacher', teacherData); // API request to create a new teacher
            console.log("Signup successful:", response.data);
            navigate('/login'); // Redirect to login on successful signup
        } catch (error) {
            console.error("Signup failed:", error); // Log any errors during signup
        }
    };

    return (
        <div className="login-container">
            <header className="login-header">
                <img src={require('../../assets/images/extended_logo.png')} alt="Capture the Future" className="logo" />
            </header>
            <div className="login-form">
                <div className="header-row">
                    <h2>Host Sign Up</h2>
                    <h5>Have a question? Get help.<md-icon>help</md-icon></h5>
                </div>
                <form onSubmit={handleSignup}>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="teacher@email.com"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        helperText="Please enter your email address."
                    />
                    <TextField
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="e.g. teacher123"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        helperText="Please enter your username."
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="*******"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        helperText="Please enter your password."
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="*******"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        helperText="Please confirm your password."
                    />
                    <TextField
                        label="School"
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        placeholder="e.g Cybersecurity High School"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        helperText="Enter the school you are teaching in"
                    />
                    <Box className="form-actions">
                    <Button variant="contained">Create Account</Button>
                    <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>Sign in</Button>
                    </Box>
                </form>
            </div>
        </div>
    );
}

export default HostSignupScreen;
