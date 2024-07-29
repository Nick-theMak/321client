// src/pages/StudentSignupScreen.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { api } from "../networking/api";
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import './StudentLoginScreen.css';

function StudentSignupScreen() {
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

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const studentData = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      yearLevel: formData.yearLevel
    };

    console.log(studentData);

    try {
      const response = await api.post('/user/student', studentData);
      console.log("Signup successful:", response.data);
      navigate('/login');
    } catch (error) {
      console.error("Signup failed:", error);
      console.log(studentData);
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
          <FormControlLabel
            control={<Checkbox name="rememberMe" color="primary" />}
            label="Remember Me"
          />
          <md-filled-button type="submit">Create Account</md-filled-button>
          <md-outlined-button type="button" onClick={() => navigate('/login')}>Sign in</md-outlined-button>
        </form>
      </div>
    </div>
  );
}

export default StudentSignupScreen;

