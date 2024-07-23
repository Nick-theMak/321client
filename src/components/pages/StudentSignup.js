import React from "react";
import { useNavigate } from 'react-router-dom';
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/icon/icon.js';
import './StudentLoginScreen.css';

function StudentSignupScreen() {
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        // Implement your sign-up logic here

        // After successful sign-up, redirect to the login page
        navigate('/login');
    };

    return (
        <div className="login-container">
            <header className="login-header">
                <img src={require('../../assets/images/ctf-logo.webp')} alt="Capture the Future" className="logo" />
            </header>
            <div className="login-form">
                <div className="header-row">
                    <h2>Student Sign Up</h2>
                    <h5>Have a question? Get help.<md-icon>help</md-icon></h5>
                </div>
                <form onSubmit={handleSignup}>
                    <md-outlined-text-field
                        label="Username/Email"
                        type="email"
                        placeholder="student@email.com"
                        class="input-field-email"
                        supporting-text="Please enter either your username or email address."
                    ></md-outlined-text-field>
                    <md-outlined-text-field
                        label="Username"
                        type="username"
                        placeholder="e.g. student123"
                        class="input-field-password"
                        supporting-text="Please enter your username."
                    ></md-outlined-text-field>
                    <md-outlined-text-field
                        label="Password"
                        type="password"
                        placeholder="*******"
                        class="input-field-password"
                        supporting-text="Please enter your password."
                    ></md-outlined-text-field>
                    <md-outlined-text-field
                        label="Confirm Password"
                        type="password"
                        placeholder="*******"
                        class="input-field-password"
                        supporting-text="Please confirm your password."
                    ></md-outlined-text-field>
                    <md-outlined-text-field
                        label="Year Level"
                        type="number"
                        placeholder="e.g 8"
                        class="input-field-email"
                        supporting-text="Enter your year level."
                    ></md-outlined-text-field>
                    <div className="remember-me">
                        <md-checkbox></md-checkbox>
                        <label>Remember Me</label>
                    </div>
                    <md-filled-button type="submit">Create Account</md-filled-button>
                    <md-outlined-button type="button" onClick={() => navigate('/login')}>Sign in</md-outlined-button>
                </form>
            </div>
        </div>
    );
}

export default StudentSignupScreen;
