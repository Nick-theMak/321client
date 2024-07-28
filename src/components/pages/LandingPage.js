import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

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
            <p>Enter a competition</p>
            <div className="buttons">
              <button className="sign-up-button" onClick={handleStudentSignup}>Sign Up</button>
              <button onClick={handleEnterCompetition}>Enter Competition</button>
            </div>
          </div>
        </div>
        <div className="card">
          <img src={require('../../assets/images/teacher.jpg')} alt="Teacher or Business" />
          <div className="card-content">
            <h3>Teacher or Business?</h3>
            <p>Host a competition</p>
            <div className="buttons">
              <button className="host-sign-up-button" onClick={handleHostSignup}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
