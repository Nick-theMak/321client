import React from 'react';
import './EnterCompetition.css';

const EnterCompetition = () => {
  return (
    <div className="enter-competition">
      <img src={require('../../assets/images/ctf-logo.webp')} alt="Capture the Future" className="logo" />
      <div className="form-container">
        <h2>Enter a Competition</h2>
        <form>
          <div className="form-field">
            <label>Competition Name</label>
            <input type="text" placeholder="Enter your name or an alternate username for the competition" />
          </div>
          <div className="form-field">
            <label>Competition Code</label>
            <input type="text" placeholder="Enter the competition code displayed on the board" />
          </div>
          <div className="form-field">
            <label>Team Code</label>
            <input type="text" placeholder="Enter a team code for a team that has been created to join the team" />
          </div>
          <div className="form-field">
            <label>Team Name</label>
            <input type="text" placeholder="If you are creating a team, enter the name" />
          </div>
          <div className="form-actions">
            <button type="button">Join Competition</button>
            <button type="button">Create or Join Team</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterCompetition;
