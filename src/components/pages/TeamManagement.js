import React, { useState, useEffect } from 'react';
import { createTeam, addTeamMember, removeTeamMember, getTeams } from '../api/api'; // API functions for team management

const TeamManagementPage = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [teamPassword, setTeamPassword] = useState('');
  const [studentUsername, setStudentUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const teamsData = await getTeams(); // Fetch existing teams
      setTeams(teamsData);
    } catch (error) {
      setError('Error loading teams');
    }
  };

  const handleCreateTeam = async () => {
    setLoading(true);
    try {
      await createTeam(teamName);
      setSuccess('Team created successfully');
      setTeamName('');
      loadTeams();
    } catch (error) {
      setError('Error creating team');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    setLoading(true);
    try {
      await addTeamMember(teamPassword, studentUsername);
      setSuccess('Member added successfully');
      setTeamPassword('');
      setStudentUsername('');
      loadTeams();
    } catch (error) {
      setError('Error adding member');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (team, member) => {
    setLoading(true);
    try {
      await removeTeamMember(team, member);
      setSuccess('Member removed successfully');
      loadTeams();
    } catch (error) {
      setError('Error removing member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="team-management-page">
      <h2>Manage Teams</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        <label>Team Name:</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
        />
        <button onClick={handleCreateTeam} disabled={loading}>
          {loading ? 'Creating...' : 'Create Team'}
        </button>
      </div>

      <div>
        <h3>Add Team Member</h3>
        <label>Team Password:</label>
        <input
          type="text"
          value={teamPassword}
          onChange={(e) => setTeamPassword(e.target.value)}
          placeholder="Enter team password"
        />
        <label>Student Username:</label>
        <input
          type="text"
          value={studentUsername}
          onChange={(e) => setStudentUsername(e.target.value)}
          placeholder="Enter student username"
        />
        <button onClick={handleAddMember} disabled={loading}>
          {loading ? 'Adding...' : 'Add Member'}
        </button>
      </div>

      <div>
        <h3>Teams</h3>
        {teams.map((team) => (
          <div key={team.id}>
            <h4>{team.name}</h4>
            <ul>
              {team.members.map((member) => (
                <li key={member}>
                  {member}{' '}
                  <button onClick={() => handleRemoveMember(team.name, member)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManagementPage;
