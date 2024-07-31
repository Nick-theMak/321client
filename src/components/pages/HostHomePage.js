import React, { useEffect, useState } from 'react';
import './HostDashboard.css';
import { useNavigate } from 'react-router-dom';


const HostHomePage = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const userDetails = JSON.parse(localStorage.getItem('user'));
      if (userDetails) {
        setUser(userDetails);
        console.log(user);
      } else {
        navigate('/login');
      }
    }

    loadUser();
  }, [navigate]);

  return (
    <div>      
      <div className="host-dashboard">
        <div className="welcome-section">
          <h1>Welcome {user.username}!</h1>
        </div>
        <div className="info-section">
          <div className="info-card">
            <h2>Current Competition</h2>
            <p>There is no competition hosted.</p>
          </div>
          <div className="info-card">
            <h2>Competitions Hosted</h2>
            <p>2</p>
          </div>
        </div>
        <div className="action-section">
          <div className="action-card">
            <img src="path-to-host-competition-image" alt="Host Competition" />
            <div className="action-content">
              <h3>Host a Competition</h3>
              <p>Configure and host a competition for the participants.</p>
              <button className="start-competition-button">Start Competition</button>
            </div>
          </div>
          <div className="action-card">
            <img src="path-to-review-competitions-image" alt="Review Competitions" />
            <div className="action-content">
              <h3>Review Past Competitions</h3>
              <p>Review the scoreboard for past competitions after they have been completed.</p>
              <button className="view-history-button">View History</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostHomePage;
