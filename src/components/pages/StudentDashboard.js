import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DrawerAppBar from '../elements/DrawerAppBar';
import CompetitionHomePage from './CompetitionHomePage';
import ChallengesList from './ChallengesList';
import Leaderboard from './Leaderboard';
import StudentAccountManagement from './StudentAccountManagement';
import PastCompetitions from './PastCompetitions';
import AccessibilityOptions from './AccessibilityOptions';
import AdminDashboard from './AdminDashboard';

const StudentDashboard = () => {
  return (
    <div>
      <DrawerAppBar />
      <Routes>
        <Route path="/" element={<CompetitionHomePage />} />
        <Route path="challenges-list" element={<ChallengesList />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="account-management" element={<StudentAccountManagement />} />
        <Route path="past-competitions" element={<PastCompetitions />} />
        <Route path="accessibility-options" element={<AccessibilityOptions />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default StudentDashboard;
