import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { getAllCompetitions } from '../networking/api';
import './Leaderboard.css';

function Leaderboard() {
  // State hook to manage team data
  const [teams, setTeams] = useState([]);

  // Fetch the team data from the API when the component mounts
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Fetch all competitions data
        const competitions = await getAllCompetitions();

        // Extract team names and scores from the competitions
        const teamsData = competitions.flatMap((competition) => 
          competition.teamsList.map((team) => ({
            name: team.teamName,
            score: team.score,
          }))
        );

        // Update the state with the teams' data
        setTeams(teamsData);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    };

    fetchTeams();
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  return (
    <Container maxWidth="md">
      <Typography variant="h5" className="header">
        Leaderboard
      </Typography>
      <p>View your team's rank</p>
      
      {/* Table container for displaying team data */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {team.name}
                </TableCell>
                <TableCell align="right">{team.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Leaderboard;
