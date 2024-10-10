import React, { useState } from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { createCompetition, createChallenge } from '../networking/api'; // Import relevant APIs
import { useNavigate } from 'react-router-dom';
import './HostConfigPage.css';

const HostConfigPage = () => {
  const [competitionDetails, setCompetitionDetails] = useState({ maxTeams: '', maxTeamSize: '' });
  const [challengeDetails, setChallengeDetails] = useState({ challengeName: '', description: '', difficulty: 'Beginner', points: '' });
  const [competitionCode, setCompetitionCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle Competition Creation
  const handleCompetitionSubmit = async () => {
    try {
      const response = await createCompetition(competitionDetails.maxTeams, competitionDetails.maxTeamSize);
      setCompetitionCode(response.competitionCode); // Capture competition code from backend
      alert(`Competition created successfully! Code: ${response.competitionCode}`);
    } catch (error) {
      setError('Failed to create competition: ' + (error.message || error));
    }
  };

  // Handle Challenge Creation
  const handleChallengeSubmit = async () => {
    try {
      await createChallenge(1, challengeDetails.challengeName, challengeDetails.description, challengeDetails.difficulty, challengeDetails.points);
      alert('Challenge created successfully!');
    } catch (error) {
      setError('Failed to create challenge: ' + (error.message || error));
    }
  };

  // Navigate to the live monitoring page
  const navigateToLiveMonitoring = () => {
    navigate(`/live-monitoring/${competitionCode}`);
  };

  return (
    <div className="host-config-page">
      <Typography variant="h4">Host Challenge Setup</Typography>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <br />
      <br />

      <Grid container spacing={4}>

        {/* Competition Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Create Competition</Typography>
          <TextField
            label="Max Teams"
            value={competitionDetails.maxTeams}
            onChange={(e) => setCompetitionDetails({ ...competitionDetails, maxTeams: e.target.value })}
          />
          <TextField
            label="Max Team Size"
            value={competitionDetails.maxTeamSize}
            onChange={(e) => setCompetitionDetails({ ...competitionDetails, maxTeamSize: e.target.value })}
          />
          <Button onClick={handleCompetitionSubmit}>Create Competition</Button>
        </Grid>

        {/* Challenge Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Create Challenge</Typography>
          <TextField
            label="Challenge Name"
            value={challengeDetails.challengeName}
            onChange={(e) => setChallengeDetails({ ...challengeDetails, challengeName: e.target.value })}
          />
          <TextField
            label="Description"
            value={challengeDetails.description}
            onChange={(e) => setChallengeDetails({ ...challengeDetails, description: e.target.value })}
          />
          <TextField
            label="Difficulty"
            value={challengeDetails.difficulty}
            onChange={(e) => setChallengeDetails({ ...challengeDetails, difficulty: e.target.value })}
          />
          <TextField
            label="Points"
            value={challengeDetails.points}
            onChange={(e) => setChallengeDetails({ ...challengeDetails, points: e.target.value })}
          />
          <Button onClick={handleChallengeSubmit}>Create Challenge</Button>
        </Grid>

      </Grid>

      {competitionCode && (
        <div className="competition-code-section">
          <Typography variant="h5">Competition Code: {competitionCode}</Typography>
          <Button onClick={navigateToLiveMonitoring}>Go to Live Monitoring</Button>
        </div>
      )}
    </div>
  );
};

export default HostConfigPage;
