import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../networking/api';
import './LandingPage.css';
import { Button } from '@mui/material';

const LandingPage = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      console.log("Token has expired. Removed from storage.");
    }
  }, []);

  const navigate = useNavigate();

  const handleStartChallenge = () => {
    navigate('/sample-challenges-list');
  };

  const handleStudentSignup = () => {
    navigate('/student-signup');
  };

  const handleHostSignup = () => {
    navigate('/host-signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <img
        src={require('../../assets/images/extended_logo.png')}
        alt="Capture the Future"
        className="logo"
      />
      <div className="cards">
        <div className="card">
          <img
            src={require('../../assets/images/students.jpg')}
            alt="Student"
          />
          <div className="card-content">
            <h3>Student?</h3>
            <p>
              Get the code that your teacher has projected onto the board, join
              a team, then solve challenges to earn points.
            </p>
            <div className="buttons">
              <Button variant="contained" onClick={handleStudentSignup}>
                Sign Up
              </Button>
              <Button
                variant="contained"
                onClick={handleStartChallenge}
                style={{ backgroundColor: '#009432', color: '#ffffff' }}
              >
                Try a Sample Challenge
              </Button>
            </div>
          </div>
        </div>
        <div className="card">
          <img
            src={require('../../assets/images/teacher.jpg')}
            alt="Teacher or Business"
          />
          <div className="card-content">
            <h3>Teacher or Business?</h3>
            <p>
              Register as a host to launch competitions that participants can
              join, enable and disable modules, and review past results.
            </p>
            <div className="buttons">
              <Button variant="contained" onClick={handleHostSignup}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
        <div className="card">
          <img
            src={require('../../assets/images/Login.webp')}
            alt="Existing Account"
          />
          <div className="card-content">
            <h3>Already have an account?</h3>
            <p>Login to your account to get started.</p>
            <div className="buttons">
              <Button variant="contained" onClick={handleLogin}>
                Log In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
