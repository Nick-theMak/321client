import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DrawerAppBar from '../elements/DrawerAppBar';
import CompetitionHomePage from './CompetitionHomePage';
import ChallengesList from './ChallengesList';
import Leaderboard from './Leaderboard';
import AccountManagement from './AccountManagement';
import PastCompetitions from './PastCompetitions';
import AccessabilityOptions from './AccessabilityOptions';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  return (
    <div>
      <DrawerAppBar />
      <Routes>
        <Route path="/" element={<CompetitionHomePage />} />
        <Route path="challenges-list" element={<ChallengesList />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="account-management" element={<AccountManagement />} />
        <Route path="past-competitions" element={<PastCompetitions />} />
        <Route path="accessability-options" element={<AccessabilityOptions />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />

        <Route path="" element={<AccessabilityOptions />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
