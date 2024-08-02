import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { Typography, TextField, Button, Box } from '@mui/material';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleEnterCompetition = () => {
    navigate('/enter-competition');
  };

  const handleStudentSignup = () => {
    navigate('/student-signup');
  };

  const handleHostSignup = () => {
    navigate('/host-signup');
  }

  return (
    <div className="landing-page">
      <img src={require('../../assets/images/extended_logo.png')} alt="Capture the Future" className="logo" />
      <div className="cards">
        <div className="card">
          <img src={require('../../assets/images/students.jpg')} alt="Student" />
          <div className="card-content">
            <h3>Student?</h3>
            <p>Get the code that your teacher has projected onto the board, join a team, then solve challenges to earn points.</p>
            <div className="buttons">
              <Button variant="contained" color="primary" onClick={handleStudentSignup}>Sign Up</Button>
              <Button variant="contained" color="secondary" onClick={handleEnterCompetition}>Enter Competition</Button>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={require('../../assets/images/teacher.jpg')} alt="Teacher or Business" />
          <div className="card-content">
            <h3>Teacher or Business?</h3>
            <p>Register as a host to launch competitions that participants can join, enable and disable modules, and review past results.</p>
            <div className="buttons">
              <Button variant="contained" color="primary" onClick={handleHostSignup}>Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
