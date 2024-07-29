import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './ChallengesList.css';

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  useEffect(() => {
    // Mock data for challenges
    const mockChallenges = [
      { id: 1, title: 'Challenge 1', description: 'Description for challenge 1', difficulty: 'Easy' },
      { id: 2, title: 'Challenge 2', description: 'Description for challenge 2', difficulty: 'Medium' },
      { id: 3, title: 'Challenge 3', description: 'Description for challenge 3', difficulty: 'Hard' },
    ];
    setChallenges(mockChallenges);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficultyFilter(e.target.value);
  };

  const handleStartChallenge = (challengeId) => {
    console.log(`Starting challenge with ID: ${challengeId}`);
    // Implement the logic to start the challenge here
  };

  const filteredChallenges = challenges.filter((challenge) => {
    return (
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (difficultyFilter === '' || challenge.difficulty === difficultyFilter)
    );
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h5" className="header">
        Challenges List
      </Typography>
      <TextField
        label="Search Challenges"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Filter by Difficulty</InputLabel>
        <Select
          value={difficultyFilter}
          onChange={handleDifficultyChange}
          label="Filter by Difficulty"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredChallenges.map((challenge) => (
              <TableRow key={challenge.id} className="table-row">
                <TableCell component="th" scope="row">
                  {challenge.title}
                </TableCell>
                <TableCell>{challenge.description}</TableCell>
                <TableCell>{challenge.difficulty}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStartChallenge(challenge.id)}
                  >
                    Start
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ChallengesList;
