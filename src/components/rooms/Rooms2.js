import React, { useEffect, useState } from 'react';
import foxImage from '../../assets/images/thinking_fox.png'; // Adjust path if needed
import DrawerAppBar from '../elements/DrawerAppBar';
import { Button, TextField, Grid, Typography, Box, Container, Paper, Modal } from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchRoomDetails, fetchRoomQuestions } from '../networking/api'; // Import API methods

const Rooms2 = () => {
  const { roomId } = useParams(); // Get roomId from the route
  const [roomDetails, setRoomDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // To store flag attempts for each question
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [hintStatus, setHintStatus] = useState({});
  const [isHintModalOpen, setIsHintModalOpen] = useState(false); // Modal visibility
  const [currentQuestion, setCurrentQuestion] = useState(null); // Track current question for hints
  const [error, setError] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const QUESTIONS_PER_PAGE = 2;

  // Fetch room details and questions on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomData = await fetchRoomDetails(roomId); // API call for room details
        const questionData = await fetchRoomQuestions(roomId); // API call for room questions
        setRoomDetails(roomData);
        setQuestions(questionData);
        setAnswers(questionData.reduce((acc, question) => ({ ...acc, [question.questionId]: '' }), {}));
      } catch (error) {
        setError('Failed to load room data: ' + (error.message || error));
      }
    };
    fetchData();
  }, [roomId]);

  const handleFlagChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const checkFlag = (questionId, correctAnswer) => {
    const flagAttempt = answers[questionId];
    if (flagAttempt === correctAnswer) {
      alert('Correct! Well done.');
      setCorrectAnswers((prev) => ({ ...prev, [questionId]: true }));
    } else {
      alert('Incorrect! Please try again.');
      setCorrectAnswers((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const handleOpenHintModal = (question) => {
    setCurrentQuestion(question);
    setIsHintModalOpen(true);
  };

  const handleCloseHintModal = () => {
    setIsHintModalOpen(false);
  };

  const handleShowHint = () => {
    setHintStatus((prev) => ({
      ...prev,
      [currentQuestion.questionId]: true,
    }));
    handleCloseHintModal();
  };

  if (error) return <Typography color="error">{error}</Typography>;

  // Pagination logic
  const totalPages = Math.max(Math.ceil(questions.length / QUESTIONS_PER_PAGE), 1);
  const indexOfLastQuestion = currentPage * QUESTIONS_PER_PAGE;
  const indexOfFirstQuestion = indexOfLastQuestion - QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Check if all current questions are answered correctly
  const allCurrentQuestionsCorrect = currentQuestions.every(
    (question) => correctAnswers[question.questionId]
  );

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

        {/* Room Header */}
        <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
          <Grid item xs={12} md={4}>
            <img
              src={foxImage}
              alt="Fox character"
              style={{ width: '100%', maxWidth: '150px', height: 'auto', marginRight: '5px' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {roomDetails?.description || 'Loading room...'}
            </Typography>
          </Grid>
        </Grid>

        {/* Challenge Questions Section */}
        <Grid container spacing={3}>
          {currentQuestions.map((question) => (
            <Grid item xs={12} md={6} key={question.questionId}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  {question.questionText} ({question.points} Pts)
                </Typography>
                <Typography>{question.description}</Typography>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    label="Enter your flag attempt here"
                    variant="outlined"
                    value={answers[question.questionId]}
                    onChange={(e) => handleFlagChange(question.questionId, e.target.value)}
                    disabled={!!correctAnswers[question.questionId]}
                  />
                </Box>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => checkFlag(question.questionId, question.answer)}
                    style={{ marginRight: '10px' }}
                    disabled={!!correctAnswers[question.questionId]}
                  >
                    Submit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleOpenHintModal(question)}>
                    Request Hint
                  </Button>
                </Box>
                {correctAnswers[question.questionId] && (
                  <Typography variant="body2" color="green" style={{ marginTop: '10px' }}>
                    Correct!
                  </Typography>
                )}
                {hintStatus[question.questionId] && question.hint && (
                  <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                    Hint: {question.hint}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Pagination Controls */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
            style={{ marginRight: '10px' }}
          >
            Previous
          </Button>
          <Typography variant="body1" style={{ marginTop: '8px' }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={currentPage === totalPages || !allCurrentQuestionsCorrect}
            onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
            style={{ marginLeft: '10px' }}
          >
            Next
          </Button>
        </Box>

        {/* Hint Modal */}
        <Modal open={isHintModalOpen} onClose={handleCloseHintModal}>
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
              <Button onClick={handleShowHint} variant="contained" color="primary">
                Yes
              </Button>
              <Button onClick={handleCloseHintModal} variant="contained" style={{ marginLeft: '10px' }}>
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

