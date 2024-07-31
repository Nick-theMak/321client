import React from "react";
import { useNavigate } from 'react-router-dom';
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/icon/icon.js';
import './HostAccountManagement.css';

function HostAccountManagement() {
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        // Implement your sign-up logic here

        // After successful sign-up, redirect to the login page
        navigate('/login');
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="header-row">
                    <h2>Update Your Account Information</h2>
                    <h5>Have a question? Get help.<md-icon>help</md-icon></h5>
                </div>
                <form onSubmit={handleSignup}>
                    <md-outlined-text-field
                        label="Email"
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
                        label="School"
                        type="text"
                        placeholder="e.g 8"
                        class="input-field-email"
                        supporting-text="Enter the name of your school."
                    ></md-outlined-text-field>
                    <md-filled-button type="submit">Save Your Details</md-filled-button>
                    <md-outlined-button type="button" onClick={() => navigate('/dashboard/past-competitions')}>View Competition History</md-outlined-button>
                </form>
            </div>
        </div>
    );
}

export default HostAccountManagement;
