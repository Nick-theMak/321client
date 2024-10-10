import React from 'react';
import './HostDashboard.css';
import HostDrawerAppBar from '../elements/HostDrawerAppBar';
import { Routes, Route } from 'react-router-dom';

// Import all pages for the host dashboard
import HostHomePage from './HostHomePage';
import HostPastCompetitions from './HostPastCompetitions';
import HostAccountManagement from './HostAccountManagement';
import AccessibilityOptions from './AccessibilityOptions';
import OfflineResources from './OfflineResources';
import HostConfigPage from './HostConfigPage'; // Import new component
import LiveMonitoringPage from './LiveMonitoringPage';

const HostDashboard = () => {
  return (
    <>
      <HostDrawerAppBar />
      <Routes>
        <Route path="/" element={<HostHomePage />} />
        <Route path="past-competitions" element={<HostPastCompetitions />} />
        <Route path="/host-competition" element={<HostConfigPage />} />
        <Route path="account-management" element={<HostAccountManagement />} />
        <Route path="accessibility-options" element={<AccessibilityOptions />} />
        <Route path="offline-resources" element={<OfflineResources />} />
        <Route path="/live-monitoring/:competitionCode" element={<LiveMonitoringPage />} />
      </Routes>
    </>
  );
};

export default HostDashboard;
