import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Button, Box } from '@mui/material';
import { api, loadUserDetails } from "../networking/api";
import './StudentAccountManagement.css';

function StudentAccountManagement() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        yearLevel: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async () => {

        const previousUserDetails = localStorage.getItem('user')
        const parsedUserDetails = JSON.parse(previousUserDetails);

        console.log(previousUserDetails);
        console.log("Username: ", parsedUserDetails.username);

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const updateData = {
            email: formData.email,
            username: formData.username,
            password: formData.password,
            yearLevel: formData.yearLevel
        };

        console.log(updateData);

        try {
            const response = await api.patch(`/student/edit`, updateData, {
                params: {
                    username: parsedUserDetails.username
                }
            });
            alert("Update successful");
            console.log("Update successful:", response.data);

            const userDetails = await loadUserDetails(formData.username);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.setItem('user', JSON.stringify(userDetails)); 
            localStorage.setItem('token', response.data)
            console.log(localStorage.getItem('user'));
        } catch (error) {
            // console.log(localStorage.getItem('user'));
            console.error("Update failed:", error);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            <Box sx={{ width: '100%', textAlign: 'center', mb: 3 }}>
                <Typography variant="h4">Update Your Account Information</Typography>
            </Box>
            <Box sx={{ width: '100%', maxWidth: '600px', mb: 2 }}>
                <form>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="student@email.com"
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
                        placeholder="e.g. student123"
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
                        label="Year Level"
                        type="number"
                        name="yearLevel"
                        value={formData.yearLevel}
                        onChange={handleChange}
                        placeholder="e.g. 8"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        helperText="Enter your year level."
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button variant="contained" onClick={handleUpdate}>Save Your Details</Button>
                        {/* <Button variant="outlined" color="secondary" onClick={() => navigate('/dashboard/past-competitions')}>View Competition History</Button> */}
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default StudentAccountManagement;
