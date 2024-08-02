import React, { useState } from 'react';
import './StartCompetition.css';
import { Route, Routes } from 'react-router-dom';

import HostCompetition from './HostCompetition';

const StartCompetition = () => {
  const [competitionCode, setCompetitionCode] = useState('');
  const [maxTeamMembers, setMaxTeamMembers] = useState('');
  const [modules, setModules] = useState({
    beginnerCrypto: true,
    intermediateCrypto: true,
    advancedCrypto: true,
    beginnerOsint: true,
  });

  // Function to generate a random competition code
  const generateCode = () => {
    const newCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setCompetitionCode(newCode);
  };

  // Function to toggle the modules
  const toggleModule = (module) => {
    setModules({ ...modules, [module]: !modules[module] });
  };

  const handleStartCompetition = () => {
    // Logic to start the competition
    alert('Competition has started!');
    // Redirect to Host Competition page
    window.location.href = '/host-dashboard/host-competition';
  };

  return (
    <><Routes>
          <Route path="/host-competition" element={<HostCompetition />} />
      </Routes><div className="start-competition">
              <h1>Configure the Competition</h1>
              <form>
                  <div className="form-group">
                      <label>Competition Code</label>
                      <input
                          type="text"
                          value={competitionCode}
                          onChange={(e) => setCompetitionCode(e.target.value)} />
                      <button type="button" onClick={generateCode}>Generate Code</button>
                  </div>
                  <div className="form-group">
                      <label>Maximum Team Members</label>
                      <input
                          type="number"
                          value={maxTeamMembers}
                          onChange={(e) => setMaxTeamMembers(e.target.value)} />
                  </div>
                  <h2>Modify Modules</h2>
                  <div className="module-group">
                      <div className="module">
                          <span>Cryptography - Beginner</span>
                          <input
                              type="checkbox"
                              checked={modules.beginnerCrypto}
                              onChange={() => toggleModule('beginnerCrypto')} />
                      </div>
                      <div className="module">
                          <span>Cryptography - Intermediate</span>
                          <input
                              type="checkbox"
                              checked={modules.intermediateCrypto}
                              onChange={() => toggleModule('intermediateCrypto')} />
                      </div>
                      <div className="module">
                          <span>Cryptography - Advanced</span>
                          <input
                              type="checkbox"
                              checked={modules.advancedCrypto}
                              onChange={() => toggleModule('advancedCrypto')} />
                      </div>
                      <div className="module">
                          <span>Open Source Intelligence - Beginner</span>
                          <input
                              type="checkbox"
                              checked={modules.beginnerOsint}
                              onChange={() => toggleModule('beginnerOsint')} />
                      </div>
                  </div>
                  <button type="button" onClick={handleStartCompetition}>
                      Save and Start Competition
                  </button>
              </form>
          </div></>
  );
};

export default StartCompetition;
