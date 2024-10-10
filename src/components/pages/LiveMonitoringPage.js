import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLiveScores, fetchTeams, endCompetition, removeTeamMember } from '../networking/api'; // API calls
import './LiveMonitoringPage.css';

const LiveMonitoringPage = () => {
  const { competitionCode } = useParams(); // Get the competition code from the route
  const [teams, setTeams] = useState([]);
  const [liveScores, setLiveScores] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Polling interval for real-time updates (5 seconds)
  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        const fetchedTeams = await fetchTeams(competitionCode);
        const fetchedScores = await fetchLiveScores(competitionCode);
        setTeams(fetchedTeams);
        setLiveScores(fetchedScores);
      } catch (error) {
        setError('Failed to fetch competition data: ' + (error.message || error));
      }
    };

    // Initial data fetch
    fetchCompetitionData();

    // Polling every 5 seconds for updates
    const intervalId = setInterval(fetchCompetitionData, 5000); // Poll every 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [competitionCode]);

  // Handle ending the competition
  const handleEndCompetition = async () => {
    try {
      await endCompetition(competitionCode);
      alert('Competition ended successfully');
      navigate('/host-dashboard'); // Redirect back to the dashboard after ending
    } catch (error) {
      setError('Failed to end competition: ' + (error.message || error));
    }
  };

  // Handle removing a member from a team
  const handleRemoveMember = async (teamId, memberUsername) => {
    try {
      await removeTeamMember(teamId, memberUsername);
      alert(`Removed ${memberUsername} from the team.`);
      // Refresh teams after modification
      const fetchedTeams = await fetchTeams(competitionCode);
      setTeams(fetchedTeams);
    } catch (error) {
      setError('Failed to remove member: ' + (error.message || error));
    }
  };

  return (
    <div className="live-monitoring-page">
      <h1>Competition Code: {competitionCode}</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Teams Section */}
      <div className="team-list">
        <h2>Teams</h2>
        {teams.length === 0 && <p>No teams have joined yet.</p>}
        {teams.map((team) => (
          <div key={team.id} className="team">
            <h3>{team.name}</h3>
            <p>Members: 
              {team.members.map((member) => (
                <span key={member} className="team-member">
                  {member} 
                  <button className="remove-member-button" onClick={() => handleRemoveMember(team.id, member)}>
                    Remove
                  </button>
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* Scores Section */}
      <div className="score-list">
        <h2>Live Scores</h2>
        {liveScores.length === 0 && <p>No scores available yet.</p>}
        {liveScores.map((score) => (
          <div key={score.teamId} className="score">
            <h3>{score.teamName}: {score.points} points</h3>
          </div>
        ))}
      </div>

      {/* End Competition Button */}
      <div className="end-competition-section">
        <button onClick={handleEndCompetition} className="end-competition-button">
          End Competition
        </button>
      </div>
    </div>
  );
};

export default LiveMonitoringPage;
