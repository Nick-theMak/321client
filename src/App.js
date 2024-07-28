import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import StudentLoginScreen from './components/pages/StudentLoginScreen';

import StudentSignupScreen from './components/pages/StudentSignup';
import HostSignupScreen from './components/pages/HostSignup';
import Dashboard from './components/pages/Dashboard';
import AccountManagement from './components/pages/AccountManagement';
import PastCompetitions from './components/pages/PastCompetitions';
import CompetitionHomePage from './components/pages/CompetitionHomePage';
import ChallengesList from './components/pages/ChallengesList';
import Leaderboard from './components/pages/Leaderboard';
import EnterCompetition from './components/pages/EnterCompetition';
import AccessibilityOptions from './components/pages/AccessibilityOptions';
import AdminDashboard from './components/pages/AdminDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<StudentLoginScreen />} />
        <Route path="/student-signup" element={<StudentSignupScreen />} />
        <Route path="/host-signup" element={<HostSignupScreen />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/enter-competition" element={<EnterCompetition />} />
        <Route path="/accessibility-options" element={<AccessibilityOptions/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<div>Page Not Found</div>} />
        
      </Routes>
    </Router>
  );
}

export default App;
