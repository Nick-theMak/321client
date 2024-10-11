// src/pages/StudentLoginScreen.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { api, loadUserDetails } from "../networking/api";
import AlertPopup from "../elements/AlertPopup";
import { useAlert } from "../elements/hooks/useAlert";
import { sendForgotPasswordEmail } from '../../services/emailService'; // Import the email service
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import './StudentLoginScreen.css';

function StudentLoginScreen() {
  const navigate = useNavigate();
  const { alertOpen, alertMessage, showAlert, closeAlert } = useAlert();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false); // Manage forgot password dialog
  const [email, setEmail] = useState(''); // Email input for forgot password

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (formData.username === '' || formData.password === '') {
      showAlert("Please fill in all of the fields.");
      return;
    }

    try {
      const response = await api.post('/user/login', formData);
      localStorage.setItem('token', response.data.details.token);

      const userDetails = await loadUserDetails(formData.username);
      localStorage.setItem('user', JSON.stringify(userDetails));

      // Redirect based on user role
      if (userDetails.role === 'STUDENT') {
        navigate('/student-dashboard');
      } else if (userDetails.role === 'TEACHER') {
        navigate('/host-dashboard');
      } else if (userDetails.role === 'ADMIN') {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      showAlert('Login failed. Please check your username and password.');
    }
  };

  const handleForgotPassword = () => {
    if (email === '') {
      showAlert('Please enter an email address.');
      return;
    }

    // Send forgot password email
    sendForgotPasswordEmail(email);
    showAlert('A password reset email has been sent to the admin team.');
    setForgotPasswordOpen(false);
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <img src={require('../../assets/images/extended_logo.png')} alt="Capture the Future" className="logo" />
      </header>
      <div className="login-form">
        <div className="header-row">
          <h2>Login</h2>
          <h5>Have a question? Get help.<md-icon>help</md-icon></h5>
        </div>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="student123"
            variant="outlined"
            fullWidth
            margin="normal"
            helperText="Please enter either your username or email address."
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
          <Button fullWidth variant="contained" color="primary" type="submit">Sign in</Button>
        </form>
        <Button onClick={() => setForgotPasswordOpen(true)}>Forgot Password?</Button>

        {/* Forgot Password Dialog */}
        <Dialog open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)}>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            <TextField
              label="Enter your email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setForgotPasswordOpen(false)}>Cancel</Button>
            <Button onClick={handleForgotPassword}>Submit</Button>
          </DialogActions>
        </Dialog>

        <div className="account-links">
          <a href="/student-signup">Create Student Account</a>
          <a href="/host-signup">Create Host Account</a>
        </div>
      </div>
      <AlertPopup
        open={alertOpen}
        title="Login Error"
        description={alertMessage}
        onClose={closeAlert}
      />
    </div>
  );
}

export default StudentLoginScreen;
