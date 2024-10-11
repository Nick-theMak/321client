// src/pages/StudentSignupScreen.jsx

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Checkbox, FormControlLabel, Typography, Button, Box } from '@mui/material';
import { api } from "../networking/api";
import { useAlert } from "../elements/hooks/useAlert";
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import './StudentSignupScreen.css';
import AlertPopup from "../elements/AlertPopup";
import { sendSignupEmail } from  '../../services/emailService';

function StudentSignupScreen() {
  const navigate = useNavigate();
  const { alertOpen, alertMessage, showAlert, closeAlert } = useAlert();
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

  const handleSignup = async () => {
    if (formData.email === ''
      || formData.username === ''
      || formData.password === ''
      || formData.confirmPassword === '') {
        showAlert("Please fill in all of the fields.");
      return;
    }

    if (formData.yearLevel < 1 || formData.yearLevel > 12) {
      showAlert("Enter a year level between 1 and 12.");
      return;
    }

    if (formData.password.length < 8 ) {
      showAlert("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showAlert("Passwords do not match.");
      return;
    }

    const studentData = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      yearLevel: formData.yearLevel
    };

    try {
      const response = await api.post('/user/student', studentData); // API request to create a new student
      showAlert("Account created successfully.", () => navigate('/login'));
      // Send signup confirmation email
      sendSignupEmail(formData.username, formData.email);
      console.log("Signup successful:", response.data);
    } catch (error) {
      showAlert("Signup failed.");
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <img src={require('../../assets/images/extended_logo.png')} alt="Capture the Future" className="logo" />
      </header>
      <div className="login-form">
        <div className="header-row">
          <Typography variant="h4">Student Sign Up</Typography>
          <Typography variant="subtitle1">
            Have a question? Get help.
          </Typography>
        </div>
        <form onSubmit={handleSignup}>
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
            placeholder="e.g 8"
            variant="outlined"
            fullWidth
            margin="normal"
            helperText="Enter your year level."
          />
          <Box className="form-actions">
            <Button variant="contained" onClick={() => handleSignup()}>Create Account</Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>Sign in</Button>
          </Box>
        </form>
      </div>
      <AlertPopup
        open={alertOpen}
        title="Student Sign Up"
        description={alertMessage}
        onClose={closeAlert}
      />
    </div>
  );
}

export default StudentSignupScreen;
