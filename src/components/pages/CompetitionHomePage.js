import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompetitionHomePage.css';
import { Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getUserTeamPointsAndRanking, loadOpenChallenges } from '../networking/api';

// Placeholder challenges (DELETE when API is ready)
const placeholderChallenges = [
  {
    id: 1,
    name: 'Cybersecurity Challenge',
    description: 'Test your knowledge on various cybersecurity concepts.',
    difficulty: 'Intermediate',
    status: 'Finished',
  },
  {
    id: 2,
    name: 'Hashing',
    description: 'Hashing challenge.',
    difficulty: 'Beginner',
    status: 'Not started',
  },
  {
    id: 3,
    name: 'OSINT',
    description: 'Test your knowledge on OSINT.',
    difficulty: 'Advanced',
    status: 'Not started',
  },
];

const CompetitionHomePage = () => {
  const [user, setUser] = useState(''); // State to store user details
  const [teamPoints, setTeamPoints] = useState(null); // State to store team points
  const [ranking, setRanking] = useState(null); // State to store ranking
  const [openChallenges, setOpenChallenges] = useState(placeholderChallenges); // Placeholder data
  const [fetchError, setFetchError] = useState(false); // Track errors fetching points/ranking
  const [challengesError, setChallengesError] = useState(false); // Track errors fetching challenges
  const navigate = useNavigate();

  // Load user details from local storage or navigate to login
  const loadUser = async () => {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    if (userDetails) {
      setUser(userDetails);
    } else {
      navigate('/login'); // Redirect to login if user details are not found
    }
  };

  // Fetch team points and ranking for the user
  const fetchTeamPointsAndRanking = async (username) => {
    try {
      const data = await getUserTeamPointsAndRanking(username);
      if (data) {
        setTeamPoints(data.teamPoints);
        setRanking(data.ranking);
      } else {
        setTeamPoints(null);
        setRanking(null);
      }
    } catch (error) {
      console.error('Failed to load team points and ranking', error);
      setFetchError(true);
    }
  };

  // Fetch open challenges from the API or use placeholder
  const fetchOpenChallenges = async () => {
    try {
      const challenges = await loadOpenChallenges();
      if (challenges && challenges.length > 0) {
        setOpenChallenges(challenges);
      } else {
        setOpenChallenges(placeholderChallenges); // Use placeholder challenges if none returned
      }
    } catch (error) {
      console.error('Failed to load open challenges', error);
      setOpenChallenges(placeholderChallenges); // Fallback to placeholders in case of error
      setChallengesError(true);
    }
  };

  useEffect(() => {
    loadUser();
  }, [navigate]);

  useEffect(() => {
    if (user && user.username) {
      fetchTeamPointsAndRanking(user.username);
      fetchOpenChallenges();
    }
  }, [user]);

  // Split challenges into "open" and "past"
  const openChallengesList = openChallenges.filter(
    (challenge) => challenge.status === 'Not started'
  );
  const pastChallengesList = openChallenges.filter((challenge) => challenge.status === 'Finished');

  // Handle joining or reattempting a challenge
  const handleJoinChallenge = (challengeId, status) => {
    if (status === 'Finished') {
      console.log(`Reattempting challenge ${challengeId}`);
    } else {
      console.log(`Starting challenge ${challengeId}`);
    }
    navigate(`/challenge-lobby/${challengeId}`); // Redirect to lobby
  };

  // Handle navigation to the JoinCompetition page
  const handleJoinCompetition = () => {
    navigate('/join-competition');
  };

  return (
    <div className="competition-home-page">
      <Typography variant="h5" className="header">
        Welcome {user.username}!
      </Typography>

      {/* Join Competition Button */}
      <div className="join-competition-section">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleJoinCompetition}
          className="join-competition-button"
        >
          Join a Competition
        </Button>
      </div>

      <div className="stats">
        <div className="stat">
          <h4>Current Team Points</h4>
          <p>{teamPoints !== null ? teamPoints : (fetchError ? 'Error fetching points' : 'Loading...')}</p>
        </div>
        <div className="stat">
          <h4>Current Ranking</h4>
          <p>{ranking !== null ? ranking : (fetchError ? 'Error fetching ranking' : 'Loading...')}</p>
        </div>
      </div>

      {/* Table for Open Challenges */}
      <Typography variant="h6" className="challenges-header">Open Challenges</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {openChallengesList.map((challenge) => (
            <TableRow key={challenge.id}>
              <TableCell>{challenge.name}</TableCell>
              <TableCell>{challenge.description}</TableCell>
              <TableCell>{challenge.difficulty}</TableCell>
              <TableCell>{challenge.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleJoinChallenge(challenge.id, challenge.status)}
                >
                  {challenge.status === 'Finished' ? 'Reattempt' : 'Start'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Table for Past Challenges (Finished) */}
      {pastChallengesList.length > 0 && (
        <>
          <Typography variant="h6" className="challenges-header" style={{ marginTop: '20px' }}>
            Past Challenges
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Difficulty</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pastChallengesList.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell>{challenge.name}</TableCell>
                  <TableCell>{challenge.description}</TableCell>
                  <TableCell>{challenge.difficulty}</TableCell>
                  <TableCell>{challenge.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleJoinChallenge(challenge.id, challenge.status)}
                    >
                      Reattempt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default CompetitionHomePage;
