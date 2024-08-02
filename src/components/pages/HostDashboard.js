import React from 'react';
import './HostDashboard.css';
import HostDrawerAppBar from '../elements/HostDrawerAppBar';
import { Routes, Route } from 'react-router-dom';


//Import all pages for the host dashboard
import HostHomePage from './HostHomePage';
import StartCompetition from './StartCompetition';
import HostPastCompetitions from './HostPastCompetitions';
import HostCompetition from './HostCompetition';
import HostAccountManagement from './HostAccountManagement';
import AccessibilityOptions from './AccessibilityOptions';

const HostDashboard = () => {
  return (
  
    // Extending Routes to include all the routes for the host dashboard
      <><HostDrawerAppBar /><Routes>
          <Route path="/" element={<HostHomePage />} />
          <Route path="start-competition/*" element={<StartCompetition />} />
          <Route path="past-competitions" element={<HostPastCompetitions/>} />
          <Route path="/host-competition" element={<HostCompetition />} />
          <Route path="account-management" element={<HostAccountManagement />} />
          <Route path="accessibility-options" element={<AccessibilityOptions />} />
      </Routes></>
    
  );
};

export default HostDashboard;
