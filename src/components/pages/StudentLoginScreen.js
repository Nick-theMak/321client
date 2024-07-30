import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../networking/api";
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/icon/icon.js';
import './StudentLoginScreen.css';
import { TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';


function StudentLoginScreen() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      const loginData = {
        username: formData.username,
        password: formData.password
      };

      console.log(loginData);
  
      try {
        const response = await api.post('/user/login', loginData);
        console.log("Login successful:", response.data);
        console.log(response.data.details.token);
        localStorage.setItem('token', response.data.details.token);
        navigate('/dashboard'); // Redirect to the dashboard or any other page
      } catch (error) {
        console.error("Login failed:", error);
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
                    <div className="remember-me">
                        <md-checkbox></md-checkbox>
                        <label>Remember Me</label>
                    </div>
                    <md-filled-button onClick={handleLogin}>Sign in</md-filled-button>
                </form>
                <div className="account-links">
                    <a href="/student-signup">Create Student Account</a>
                    <a href="/host-signup">Create Host Account</a>
                </div>
            </div>
        </div>
    );
}

export default StudentLoginScreen;