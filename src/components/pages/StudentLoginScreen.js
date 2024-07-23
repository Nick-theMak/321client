import React from "react";
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/icon/icon.js';
import './StudentLoginScreen.css';


function StudentLoginScreen() {
    return (
        <div className="login-container">
            <header className="login-header">
                <img src={require('../../assets/images/ctf-logo.webp')} alt="Capture the Future" className="logo" />
            </header>
            <div className="login-form">
                <div className="header-row">
                    <h2>Login</h2>
                    <h5>Have a question? Get help.<md-icon>help</md-icon></h5>
                </div>
                <form>
                    <md-outlined-text-field
                        label="Username/Email"
                        type="email"
                        placeholder="student@email.com"
                        class="input-field-email"
                        supporting-text="Please enter either your username or email address."
                    ></md-outlined-text-field>
                    <md-outlined-text-field
                        label="Password"
                        type="password"
                        placeholder="*******"
                        class="input-field-password"
                        supporting-text="Please enter your password."
                    ></md-outlined-text-field>
                    <div className="remember-me">
                        <md-checkbox></md-checkbox>
                        <label>Remember Me</label>
                    </div>
                    <md-filled-button>Sign in</md-filled-button>
                </form>
                <div className="account-links">
                    <a href="/student-signup">Create Student Account</a>
                    <a href="/host-signup">Create Host Account</a>
                </div>
            </div>
            {/* <footer className="help-link">
                <a href="#">Have a question? Get help.</a>
            </footer> */}
        </div>
    );
}

export default StudentLoginScreen;