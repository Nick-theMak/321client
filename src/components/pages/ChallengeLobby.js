import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCompetitionDetails, fetchTeams } from '../networking/api';  // API functions for fetching data
import { Button, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import './ChallengeLobby.css';

const ChallengeLobby = () => {
  const { competitionCode } = useParams();  // Get competition code from the URL
  const [competitionDetails, setCompetitionDetails] = useState(null);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch competition details and teams on load
  useEffect(() => {
    const loadLobbyData = async () => {
      try {
        const details = await fetchCompetitionDetails(competitionCode);
        const teamData = await fetchTeams(competitionCode);
        setCompetitionDetails(details);
        setTeams(teamData);
      } catch (error) {
        setError('Failed to load competition details.');
      }
    };

    loadLobbyData();
  }, [competitionCode]);

  // Navigate to the challenge room when starting the challenge
  const handleStartChallenge = () => {
    navigate(`/rooms/${competitionCode}`);  // Navigate to the challenge room
  };

  return (
    <div className="challenge-lobby">
      <Typography variant="h4" className="header">Competition Lobby</Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      {competitionDetails ? (
        <>
          <Typography variant="h6">Competition: {competitionDetails.name}</Typography>
          <Typography variant="body1">Description: {competitionDetails.description}</Typography>

          {/* Teams Table */}
          <Typography variant="h6" style={{ marginTop: '20px' }}>Teams</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Team Name</TableCell>
                <TableCell>Members</TableCell>
                <TableCell>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.members.join(', ')}</TableCell>
                  <TableCell>{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            variant="contained"
            color="primary"
            onClick={handleStartChallenge}
            className="start-challenge-button"
          >
            Start Challenge
          </Button>
        </>
      ) : (
        <Typography variant="body1">Loading competition details...</Typography>
      )}
    </div>
  );
};

export default ChallengeLobby;
