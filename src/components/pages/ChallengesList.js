import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadChallenges } from '../networking/api';
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import './ChallengesList.css';

const ChallengesList = () => {
  // State hooks to manage challenges data, search term, and difficulty filter
  const [challenges, setChallenges] = useState([]); // State to store challenges data
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
  const [difficultyFilter, setDifficultyFilter] = useState(''); // State to store difficulty filter

  useEffect(() => {
    // Function to fetch challenges from the API
    const fetchChallenges = async () => {
      try {
        const challenges = await loadChallenges();
        setChallenges(challenges); // Set the challenges state with fetched data
      } catch (err) {
        console.error('Failed to fetch challenges', err);
      }
    };

    // Uncomment this section for testing purposes with mock data
    // useEffect(() => {
    //   const mockChallenges = [
    //     { id: 1, title: 'Challenge 1', description: 'Description for challenge 1', difficulty: 'Easy' },
    //     { id: 2, title: 'Challenge 2', description: 'Description for challenge 2', difficulty: 'Medium' },
    //     { id: 3, title: 'Challenge 3', description: 'Description for challenge 3', difficulty: 'Hard' },
    //   ];
    //   setChallenges(mockChallenges);
    // }, []);

    fetchChallenges(); // Fetch challenges when the component mounts
  }, []);

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
  };

  // Handler for difficulty filter change
  const handleDifficultyChange = (e) => {
    setDifficultyFilter(e.target.value); // Update the difficulty filter state
  };

  // Handler for starting a challenge
  const handleStartChallenge = (challengeId) => {
    console.log(`Starting challenge with ID: ${challengeId}`);
    navigate('/rooms');
    // Implement the logic to start the challenge here
  };

  // Filter challenges based on search term and difficulty filter
  const filteredChallenges = challenges.filter((challenge) => {
    return (
      challenge.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
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
              <TableRow key={challenge.challengeId} className="table-row">
                <TableCell component="th" scope="row">
                  {challenge.name}
                </TableCell>
                <TableCell>{challenge.description}</TableCell>
                <TableCell>{challenge.difficulty}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStartChallenge(challenge.challengeId)}
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
