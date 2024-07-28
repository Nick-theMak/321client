import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import './PastCompetition.css';

function App() {
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
      <h1>Past Competitions</h1>
      <h3>View your history of completing Capture The Future competitions</h3>
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

export default App;
