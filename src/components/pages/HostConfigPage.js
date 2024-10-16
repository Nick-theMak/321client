// HostConfigPage.jsx
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { createCompetition } from '../networking/api'; // Import relevant APIs
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../elements/hooks/useAlert';
import './HostConfigPage.css';

const HostConfigPage = () => {
  const [competitionDetails, setCompetitionDetails] = useState({competitionName: '', maxTeams: '', maxTeamSize: '' });
  const [competitionCode, setCompetitionCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Initialize the custom alert hook
  const { alertOpen, alertMessage, alertSeverity, showAlert, closeAlert } = useAlert();

  // Handle Competition Creation
  const handleCompetitionSubmit = async () => {
    try {
      const response = await createCompetition(competitionDetails.competitionName, competitionDetails.maxTeams, competitionDetails.maxTeamSize);
      setCompetitionCode(response); // Capture competition code from backend
      console.log(response);
      showAlert(`Competition created successfully! Code: ${response}`, 'success');
    } catch (error) {
      setError('Failed to create competition: ' + (error.message || error));
      showAlert('Failed to create competition', 'error');
    }
  };

  // Navigate to the live monitoring page
  const navigateToLiveMonitoring = () => {
    navigate(`/host-dashboard/live-monitoring/${competitionCode}`);
  };

  return (
    <div className="host-config-page">
      <Typography variant="h4">Host Competition Setup</Typography>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <br />
      <br />

      <Grid container spacing={4}>

        {/* Competition Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Create Competition</Typography>
          <TextField
            label="Competition Name"
            value={competitionDetails.competitionName}
            onChange={(e) => setCompetitionDetails({ ...competitionDetails, competitionName: e.target.value })}
          />
          <TextField
            label="Max Teams"
            type="number"
            value={competitionDetails.maxTeams}
            onChange={(e) => setCompetitionDetails({ ...competitionDetails, maxTeams: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Max Team Size"
            type="number"
            value={competitionDetails.maxTeamSize}
            onChange={(e) => setCompetitionDetails({ ...competitionDetails, maxTeamSize: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleCompetitionSubmit}>
            Create Competition
          </Button>
        </Grid>

      </Grid>

      {competitionCode && (
        <div className="competition-code-section">
          <Typography variant="h5">Competition Code: {competitionCode}</Typography>
          <Button variant="contained" color="secondary" onClick={navigateToLiveMonitoring}>
            Go to Live Monitoring
          </Button>
        </div>
      )}

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
    </div>
  );
};

export default HostConfigPage;
