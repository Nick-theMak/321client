import React from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import './EnterCompetition.css';
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';

const EnterCompetition = () => {
  return (
    <div className="enter-competition">
      <img src={require('../../assets/images/extended_logo.png')} alt="Capture the Future" className="logo" />
      <Box className="form-container">
      <Typography variant="h5" className="header">
       Enter a Competition!
      </Typography>
        <form>
            <TextField fullWidth margin="normal" label="Competition Name" placeholder="Enter your name or an alternate username for the competition" variant="outlined" />
            <TextField fullWidth margin="normal" label="Competition Code" placeholder="Enter the competition code displayed on the board" variant="outlined" />
            <TextField fullWidth margin="normal" label="Team Code" placeholder="Enter a team code for a team that has been created to join the team" variant="outlined" />
            <TextField fullWidth margin="normal" label="Team Name" placeholder="If you are creating a team, enter the name" variant="outlined" />
            <Box className="form-actions">
              <Button variant="contained" color="primary">Join Competition</Button>
              <Button variant="contained" color="secondary">Create or Join Team</Button>
            </Box>
        </form>
      </Box>
    </div>
  );
};

export default EnterCompetition;
