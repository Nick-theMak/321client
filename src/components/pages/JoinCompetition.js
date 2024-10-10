import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { joinCompetition } from '../networking/api';  // Correct API function
import './JoinCompetition.css';

const JoinCompetition = () => {
  const [competitionCode, setCompetitionCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle competition join
  const handleJoin = async () => {
    try {
      const response = await joinCompetition(competitionCode);
      if (response.success) {
        // Navigate to the lobby if the competition code is valid
        navigate(`/challenge-lobby/${competitionCode}`);
      } else {
        setError('Invalid competition code. Please try again.');
      }
    } catch (error) {
      setError('Failed to join competition. Please try again later.');
    }
  };

  return (
    <div className="join-competition">
      <Typography variant="h4" className="header">Join a Competition</Typography>
      <TextField
        label="Competition Code"
        value={competitionCode}
        onChange={(e) => setCompetitionCode(e.target.value)}
        variant="outlined"
        className="competition-code-input"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleJoin}
        className="join-button"
      >
        Join
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default JoinCompetition;
