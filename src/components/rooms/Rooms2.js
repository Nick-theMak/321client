import React, { useState } from 'react';
import foxImage from '../../assets/images/thinking_fox.png'; // Adjust path if needed
import DrawerAppBar from "../elements/DrawerAppBar";
import { Button, TextField, Grid, Typography, Box, Container, Paper, Modal } from '@mui/material';

const Rooms2 = () => {
  const [flag1, setFlag1] = useState('');
  const [flag2, setFlag2] = useState('');
  const [hint1, setHint1] = useState(false); // Track whether the hint is shown for challenge 1
  const [hint2, setHint2] = useState(false); // Track whether the hint is shown for challenge 2
  const [isHintModalOpen, setIsHintModalOpen] = useState(false); // Control modal visibility
  const [currentChallenge, setCurrentChallenge] = useState(null); // Track which challenge is requesting the hint

  const correctFlag1 = 'crypto{hash_found}';
  const correctFlag2 = 'crypto{clear_text}';

  const checkFlag = (flag, correctValue) => {
    if (flag === correctValue) {
      alert('Congratulations! You entered the correct flag!');
    } else {
      alert('Incorrect! Please try again.');
    }
  };

  const handleOpenModal = (challenge) => {
    setCurrentChallenge(challenge);
    setIsHintModalOpen(true); // Open the modal for the selected challenge
  };

  const handleCloseModal = () => {
    setIsHintModalOpen(false); // Close the modal
  };

  const handleHint = () => {
    if (currentChallenge === 'challenge1') {
      setHint1(true); // Show the hint for challenge 1
    } else if (currentChallenge === 'challenge2') {
      setHint2(true); // Show the hint for challenge 2
    }
    handleCloseModal(); // Close the modal after showing the hint
  };

  return (
    <div>
      <DrawerAppBar />
    <Container>
      
      {/* Back Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => window.history.back()}
        style={{ marginBottom: '20px' }}
      >
        ← Back
      </Button>

      {/* Header Section */}
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={4}>
          <img src={foxImage} alt="Fox character" style={{ width: '100%', maxWidth: '150px', height: 'auto', marginRight: '5px' }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Intermediate: Hashing-In-Depth
          </Typography>
          <Typography variant="body1">
            Hi there! I'm <span style={{ fontWeight: 'bold', color: '#FF6347' }}>Fiona the Fox</span>, and I'll be guiding you through this cryptography challenge.
            Today, we are working with hashing algorithms and clear text retrievals. Your task is to solve the challenge below, break the code, 
            and find the flag hidden in the data. Use the hint provided and crack the mystery. Good luck!
          </Typography>
        </Grid>
      </Grid>

      {/* Challenge Section */}
      <Grid container spacing={3}>

        {/* Challenge 1 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Challenge 1: Detect the Hash (500 Pts)
            </Typography>
            <Typography>
              You've received a mysterious file named <code>SuspiciousFile.txt</code> with an unknown hash. Using the following hashed value:
              <br />
              <code>5d41402abc4b2a76b9719d911017c592</code>, can you figure out what the original cleartext (the secret message) was?
            </Typography>
            <Box mt={2}>
              <TextField
                fullWidth
                label="Enter your flag attempt here"
                variant="outlined"
                value={flag1}
                onChange={(e) => setFlag1(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => checkFlag(flag1, correctFlag1)}
                style={{ marginRight: '10px' }}
              >
                Submit
              </Button>
              <Button 
                variant="contained"
                color="secondary"
                onClick={() => handleOpenModal('challenge1')} // Open the modal for challenge 1
              >
                Request Hint
              </Button>
            </Box>
            {hint1 && (
              <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                Hint: It's a very simple word used frequently in greetings.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Challenge 2 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Challenge 2: Cleartext Retrieval (1000 Pts)
            </Typography>
            <Typography>
              You are given the hash value <code>e99a18c428cb38d5f260853678922e03</code>, which was generated by hashing a password. Can you recover the original password?
              It’s commonly used in simple password cracking demonstrations.
            </Typography>
            <Box mt={2}>
              <TextField
                fullWidth
                label="Enter your flag attempt here"
                variant="outlined"
                value={flag2}
                onChange={(e) => setFlag2(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => checkFlag(flag2, correctFlag2)}
                style={{ marginRight: '10px' }}
              >
                Submit
              </Button>
              <Button 
                variant="contained"
                color="secondary"
                onClick={() => handleOpenModal('challenge2')} // Open the modal for challenge 2
              >
                Request Hint
              </Button>
            </Box>
            {hint2 && (
              <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                Hint: The password is a very simple sequence of numbers that you often start with when counting.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Modal for requesting a hint */}
      <Modal open={isHintModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6">Request a Hint</Typography>
          <Typography>Would you like to reveal a hint for this challenge?</Typography>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleHint} variant="contained" color="primary">
              Yes
            </Button>
            <Button onClick={handleCloseModal} variant="contained" style={{ marginLeft: '10px' }}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
    </div>
  );
};

export default Rooms2;
