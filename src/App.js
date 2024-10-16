import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//Import all pages for the application
import LandingPage from './components/pages/LandingPage';
import StudentLoginScreen from './components/pages/StudentLoginScreen';
import StudentSignupScreen from './components/pages/StudentSignupScreen';
import SampleChallengesList from './components/pages/SampleChallengesList';
import SampleRooms from './components/rooms/SampleRooms';
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
import Rooms2 from './components/rooms/Rooms2';
import RoomsList from './components/rooms/RoomsList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<StudentLoginScreen />} />
        <Route path="/sample-challenges-list" element={<SampleChallengesList />} />
        <Route path="/sampleRoom/:challengeId" element={<SampleRooms />} />
        <Route path="/student-signup" element={<StudentSignupScreen />} />
        <Route path="/host-signup" element={<HostSignupScreen />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />
        <Route path="/host-dashboard/*" element={<HostDashboard />} /> 
        <Route path="/enter-competition" element={<EnterCompetition />} />
        <Route path="/accessibility-options" element={<AccessibilityOptions/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/rooms/:challengeId" element={<Rooms />} />
        <Route path="/rooms-list" element={<RoomsList />} />
        <Route path="/rooms-two/:roomId" element={<Rooms2 />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
