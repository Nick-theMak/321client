import React, { useEffect, useState } from 'react';
import './HostDashboard.css'; 
import { useNavigate } from 'react-router-dom'; 

const HostHomePage = () => {
  // State hook to manage user details
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/host-dashboard/start-competition');
  };

  useEffect(() => {
    const loadUser = async () => {
      const userDetails = JSON.parse(localStorage.getItem('user')); // load user details from local storage
      if (userDetails) {
        setUser(userDetails); 
        console.log(user);
      } else {
        navigate('/login'); // Redirect to login if user details are not found
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

        </div>
        <div className="action-section">
          <div className="action-card">
            <img src="path-to-host-competition-image" alt="Host Competition" />
            <div className="action-content">
              <h3>Host a Competition</h3>
              <p>Configure and host a competition for the participants.</p>
              <button onClick={() => handleNavigation('/host-dashboard/host-competition')}  className="start-competition-button">Start Competition</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HostHomePage;
