import React from 'react';
import './HostCompetition.css';

const HostCompetition = () => {
  return (
    <div className="host-competition">
      <h1>Enter the Below Competition Code</h1>
      <div className="competition-code">ABC123</div>
      <div className="teams-section">
        <h2>Joined Teams</h2>
        <ul>
          <li>Team 1</li>
          <li>Team 2</li>
          <li>Team 3</li>
          <li>The Best</li>
        </ul>
        <button className="open-challenges-button">Open Challenges</button>
      </div>
    </div>
  );
};

export default HostCompetition;
