import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import StudentLoginScreen from './components/pages/StudentLoginScreen';

import StudentSignupScreen from './components/pages/StudentSignupScreen';
import HostSignupScreen from './components/pages/HostSignup';
import StudentDashboard from './components/pages/StudentDashboard';
import HostDashboard from './components/pages/HostDashboard';
import StudentAccountManagement from './components/pages/StudentAccountManagement';
import PastCompetitions from './components/pages/PastCompetitions';
import CompetitionHomePage from './components/pages/CompetitionHomePage';
import ChallengesList from './components/pages/ChallengesList';
import Leaderboard from './components/pages/Leaderboard';
import EnterCompetition from './components/pages/EnterCompetition';
import AccessibilityOptions from './components/pages/AccessibilityOptions';
import AdminDashboard from './components/pages/AdminDashboard';
import Rooms from './components/rooms/Rooms';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<StudentLoginScreen />} />
        <Route path="/student-signup" element={<StudentSignupScreen />} />
        <Route path="/host-signup" element={<HostSignupScreen />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />
        <Route path="/host-dashboard/*" element={<HostDashboard />} /> 
        <Route path="/enter-competition" element={<EnterCompetition />} />
        <Route path="/accessibility-options" element={<AccessibilityOptions/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
