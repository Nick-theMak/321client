// LiveMonitoringPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Box,
  Typography,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchRankedTeams,
  setCompetitionStatus,
  removeTeamMember,
  getCompetitionStatus,
  getUnassignedStudents,
  addStudentToTeam,
} from '../networking/api';
import { useAlert } from '../elements/hooks/useAlert';

const LiveMonitoringPage = () => {
  const { competitionCode } = useParams();
  const [rankedTeams, setRankedTeams] = useState([]);
  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [selectedTeamName, setSelectedTeamName] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // List of possible statuses
  const statuses = ['Started', 'In progress', 'Finished', 'Paused', 'Cancelled'];

  // Initialize the custom alert hook
  const { alertOpen, alertMessage, alertSeverity, showAlert, closeAlert } = useAlert();

  // Polling interval for real-time updates (5 seconds)
  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        const fetchedRankedTeams = await fetchRankedTeams(competitionCode);
        const competitionStatus = await getCompetitionStatus(competitionCode);
        const fetchedUnassignedStudents = await getUnassignedStudents(competitionCode);
        setStatus(competitionStatus);
        setRankedTeams(fetchedRankedTeams);
        setUnassignedStudents(fetchedUnassignedStudents);
      } catch (error) {
        setError('Failed to fetch competition data: ' + (error.message || error));
        showAlert('Failed to fetch competition data', 'error');
      }
    };

    // Initial data fetch
    fetchCompetitionData();

    // Polling every 5 seconds for updates
    const intervalId = setInterval(fetchCompetitionData, 5000); // Poll every 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [competitionCode]);

  // Handle changing the competition status
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      await setCompetitionStatus(competitionCode, newStatus);
      setStatus(newStatus);
      showAlert(`Competition status changed to ${newStatus}`, 'success');
    } catch (error) {
      setError('Failed to change competition status: ' + (error.message || error));
      showAlert('Failed to change competition status', 'error');
    }
  };

  // Handle removing a member from a team
  const handleRemoveMember = async (teamName, username) => {
    try {
      await removeTeamMember(teamName, username);
      showAlert(`Removed ${username} from the team.`, 'success');
      // Refresh teams after modification
      const fetchedRankedTeams = await fetchRankedTeams(competitionCode);
      setRankedTeams(fetchedRankedTeams);
    } catch (error) {
      setError('Failed to remove member: ' + (error.message || error));
      showAlert('Failed to remove member', 'error');
    }
  };

  // Handle adding a student to a team
  const handleAddStudentToTeam = async () => {
    if (!selectedUsername || !selectedTeamName) {
      showAlert('Please select a student and a team.', 'warning');
      return;
    }

    try {
      await addStudentToTeam(competitionCode, selectedTeamName, selectedUsername);
      showAlert('Student added to team successfully.', 'success');
      // Refresh data
      const fetchedRankedTeams = await fetchRankedTeams(competitionCode);
      const fetchedUnassignedStudents = await getUnassignedStudents(competitionCode);
      setRankedTeams(fetchedRankedTeams);
      setUnassignedStudents(fetchedUnassignedStudents);
      // Reset selections
      setSelectedUsername('');
      setSelectedTeamName('');
    } catch (error) {
      setError('Failed to add student to team: ' + (error.details || error));
      showAlert('Failed to add student to team: ' + (error.details), 'error');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ marginBottom: '20px' }}
      >
        ← Back
      </Button>

      <Typography variant="h1" sx={{ fontSize: '28px', marginBottom: '20px' }}>
        Competition Code: {competitionCode}
      </Typography>

      {/* Competition Status Dropdown */}
      <FormControl variant="outlined" sx={{ minWidth: 200, marginBottom: '20px' }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={handleStatusChange} label="Status">
          {statuses.map((stat) => (
            <MenuItem key={stat} value={stat}>
              {stat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Add Student to Team Section */}
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h2" sx={{ fontSize: '24px', marginBottom: '20px' }}>
          Add Student to Team
        </Typography>

        <FormControl sx={{ minWidth: 200, marginRight: '20px' }}>
          <InputLabel>Unassigned Students</InputLabel>
          <Select
            value={selectedUsername}
            onChange={(e) => setSelectedUsername(e.target.value)}
            label="Unassigned Students"
          >
            {unassignedStudents.map((student) => (
              <MenuItem key={student.username} value={student.username}>
                {student.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200, marginRight: '20px' }}>
          <InputLabel>Teams</InputLabel>
          <Select
            value={selectedTeamName}
            onChange={(e) => setSelectedTeamName(e.target.value)}
            label="Teams"
          >
            {rankedTeams.map((team) => (
              <MenuItem key={team.teamName} value={team.teamName}>
                {team.teamName} (Members: {team.numMembers}/{team.maxMembers})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleAddStudentToTeam}>
          Add Student to Team
        </Button>
      </Box>

      {/* Teams and Scores Section */}
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h2" sx={{ fontSize: '24px', marginBottom: '20px' }}>
          Teams and Live Rankings
        </Typography>

        {rankedTeams.length === 0 && (
          <Typography>No teams have joined yet.</Typography>
        )}

        {rankedTeams.map((team) => (
          <Box
            key={team.teamName}
            sx={{
              backgroundColor: '#f5f5f5',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '5px',
            }}
          >
            <Typography variant="h3" sx={{ fontSize: '18px', marginBottom: '10px' }}>
              Rank {team.rank}: {team.teamName}
            </Typography>
            <Typography>Score: {team.score} points</Typography>
            <Typography>
              Members:
              {team.members.map((member) => (
                <Box
                  key={member.username}
                  component="span"
                  sx={{ display: 'inline-block', marginRight: '10px' }}
                >
                  {member.username}
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      padding: '5px 10px',
                      marginLeft: '10px',
                      borderRadius: '3px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#d32f2f',
                      },
                    }}
                    onClick={() => handleRemoveMember(team.teamName, member.username)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Alert Component */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LiveMonitoringPage;




