import React from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import './EnterCompetition.css';

const EnterCompetition = () => {
  return (
    <div className="enter-competition">
      <img src={require('../../assets/images/extended_logo.png')} alt="Capture the Future" className="logo" />
      <Box className="form-container">
        <Typography variant="h5" className="header">
          Enter a Competition!
        </Typography>
        <form>
          <Box className="form-field">
            <TextField
              fullWidth
              label="Competition Name"
              placeholder="Enter your name or an alternate username for the competition"
              variant="outlined"
            />
          </Box>
          <Box className="form-field">
            <TextField
              fullWidth
              label="Competition Code"
              placeholder="Enter the competition code displayed on the board"
              variant="outlined"
            />
          </Box>
          <Box className="form-field">
            <TextField
              fullWidth
              label="Team Code"
              placeholder="Enter a team code for a team that has been created to join the team"
              variant="outlined"
            />
          </Box>
          <Box className="form-field">
            <TextField
              fullWidth
              label="Team Name"
              placeholder="If you are creating a team, enter the name"
              variant="outlined"
            />
          </Box>
          <Box className="form-actions">
            <Button fullWidth variant="contained" color="primary">
              Join Competition
            </Button>
            <Button fullWidth variant="contained" color="secondary">
              Create or Join Team
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default EnterCompetition;
