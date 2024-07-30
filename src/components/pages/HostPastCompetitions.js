import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import './PastCompetition.css';

function HostPastCompetitions() {
  const [players, setPlayers] = useState([
    { name: 'Player 1', date:'10/10/10', score: 100 },
    { name: 'Player 2', date:'10/10/10',score: 90 },
    { name: 'Player 3', date:'10/10/10', score: 80 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prevPlayers) => 
        prevPlayers.map(player => ({
          ...player,
          score: player.score + Math.floor(Math.random() * 10)
        }))
      );
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" className="header">
        Past Competitions
      </Typography>
      <p>history of completing Capture The Future competitions</p>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="center">{player.date}</TableCell>
                <TableCell align="right">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default HostPastCompetitions;
