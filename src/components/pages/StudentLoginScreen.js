import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, loadUserDetails } from "../networking/api";
import AlertPopup from "../elements/AlertPopup";
import { useAlert } from "../elements/hooks/useAlert";
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/icon/icon.js';
import './StudentLoginScreen.css';
import { TextField, Button } from '@mui/material';

function StudentLoginScreen() {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { alertOpen, alertMessage, showAlert, closeAlert } = useAlert(); // Use the custom hook for alert
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  }); // State to manage form data

  // Handler for form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handler for form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    if (formData.username === '' || formData.password === '') {
      showAlert("Please fill in all of the fields.");
      return;
    }

    const loginData = {
      username: formData.username,
      password: formData.password
    };

    console.log(loginData);

    try {
      const response = await api.post('/user/login', loginData); // API request to log in
      localStorage.setItem('token', response.data.details.token); // Save token to local storage

      const userDetails = await loadUserDetails(formData.username); // Load user details
      localStorage.setItem('user', JSON.stringify(userDetails)); // Save user details to local storage

      // Redirect based on user role
      if (userDetails.role === 'STUDENT') {
        navigate('/student-dashboard'); // Redirect to student dashboard
      } else if (userDetails.role === 'TEACHER') {
        navigate('/host-dashboard'); // Redirect to host dashboard
      } else if (userDetails.role === 'ADMIN') {
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      }
    } catch (error) {
      showAlert('Login failed. Please check your username and password.');
    }
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
          {/* <div className="remember-me">
            <md-checkbox></md-checkbox>
            <label>Remember Me</label>
          </div> */}
          <Button fullWidth variant="contained" color="primary" type="submit">Sign in</Button>
        </form>
        <div className="account-links">
          <a href="/student-signup">Create Student Account</a>
          <a href="/host-signup">Create Host Account</a>
        </div>
      </div>
      <AlertPopup
        open={alertOpen}
        title="Login Error"
        description={alertMessage}
        onClose={closeAlert}  // Close handler from the custom hook
      />
    </div>
  );
}

export default StudentLoginScreen;
