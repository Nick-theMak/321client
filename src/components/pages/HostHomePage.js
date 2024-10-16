import React, { useEffect, useState } from 'react';
import './HostDashboard.css'; 
import { useNavigate } from 'react-router-dom';
import { getAllCompetitions } from '../networking/api'; // Assuming this function retrieves all competitions

const HostHomePage = () => {
  // State hook to manage user details and competitions
  const [user, setUser] = useState('');
  const [liveCompetitions, setLiveCompetitions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Fetch user and check if there are any live competitions
  useEffect(() => {
    const loadUser = async () => {
      const userDetails = JSON.parse(localStorage.getItem('user'));
      if (userDetails) {
        setUser(userDetails);
      } else {
        navigate('/login');
      }
    };

    // Fetch all competitions to check for live ones
    const loadCompetitions = async () => {
      try {
        const competitions = await getAllCompetitions();
        if (competitions && competitions.length > 0) {
          setLiveCompetitions(competitions); // Set all competitions (live)
        }
      } catch (error) {
        setError('Failed to load competitions.');
        console.error('Failed to load competitions:', error);
      }
    };

    loadUser();
    loadCompetitions();
  }, [navigate]);

  return (
    <div className="host-dashboard">
      <div className="welcome-section">
        <h1>Welcome {user.username}!</h1>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h2>Live Competitions</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {liveCompetitions.length > 0 ? (
            <ul>
              {liveCompetitions.map((competition) => (
                <li key={competition.id}>
                  <p>
                    <strong>{competition.competitionName}</strong> <br />
                    Status: {competition.status} <br />
                    Code: {competition.competitionCode}
                  </p>
                  <button onClick={() => handleNavigation(`/host-dashboard/live-monitoring/${competition.competitionCode}`)}>
                    Monitor Competition
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No competitions are currently live.</p>
          )}
        </div>
      </div>

      <div className="action-section">
        <div className="action-card">
          <img src="path-to-host-competition-image" alt="Host Competition" />
          <div className="action-content">
            <h3>Host a Competition</h3>
            <p>Configure and host a competition for the participants.</p>
            <button onClick={() => handleNavigation('/host-dashboard/host-competition')} className="start-competition-button">
              Start Competition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostHomePage;
