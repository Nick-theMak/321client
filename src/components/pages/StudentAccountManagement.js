import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { api, loadUserDetails } from "../networking/api"; // Import API methods
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/icon/icon.js';
import './StudentAccountManagement.css';

function StudentAccountManagement() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        yearLevel: 1
    }); // State to manage form data

    // Handler for form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handler for form submission
    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent form from submitting the default way

        const updateData = {
            email: formData.email,
            username: formData.username,
            password: formData.password,
            yearLevel: formData.yearLevel
        };

        console.log(updateData);

        try {
            const previousUsername = localStorage.getItem('user');
            console.log(previousUsername);
            const response = await api.patch(`/student/edit`, updateData,
            ); // API request to log in
            console.log("Update successful:", response.data);

            const userDetails = await loadUserDetails(formData.username); // Load user details
            console.log("User details:", userDetails);
            localStorage.setItem('user', JSON.stringify(userDetails)); // Save user details to local storage

        } catch (error) {
            console.error("Update failed:", error); // Log any errors during login
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // Implement your sign-up logic here

        // After successful sign-up, redirect to the login page
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
                        value={formData.email}
                        onChange={handleChange}
                        class="input-field-email"
                        supporting-text="Please enter either your username or email address."
                    ></md-outlined-text-field>
                    <md-outlined-text-field
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="e.g. student123"
                        value={formData.username}
                        onChange={handleChange}
                        class="input-field-password"
                        supporting-text="Please enter your username."
                    ></md-outlined-text-field>
                    <md-outlined-text-field
                        label="Password"
                        type="password"
                        placeholder="*******"
                        value={formData.password}
                        onChange={handleChange}
                        class="input-field-password"
                        supporting-text="Please enter your password."
                    ></md-outlined-text-field>
                    <md-outlined-text-field
                        label="Year Level"
                        type="number"
                        placeholder="e.g 8"
                        value={formData.yearLevel}
                        onChange={handleChange}
                        class="input-field-email"
                        supporting-text="Enter your year level."
                    ></md-outlined-text-field>
                    <md-filled-button type="submit" onClick={handleUpdate}>Save Your Details</md-filled-button>
                    <md-outlined-button type="button" onClick={() => navigate('/dashboard/past-competitions')}>View Competition History</md-outlined-button>
                </form>
            </Box>
            <AlertPopup
                open={alertOpen}
                title="Account Update"
                description={alertMessage}
                onClose={closeAlert}  // Close handler from the custom hook
            />
        </Box>
    );
}

export default StudentAccountManagement;
