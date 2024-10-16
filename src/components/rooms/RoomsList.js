import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllRooms } from '../networking/api';
import { useParams } from 'react-router-dom';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import './RoomsList.css';
import DrawerAppBar from '../elements/DrawerAppBar';

const RoomsList = () => {
  // State hooks to manage rooms data, search term, and difficulty filter
  const [rooms, setRooms] = useState([]); // State to store rooms data
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
  const [difficultyFilter, setDifficultyFilter] = useState(''); // State to store difficulty filter
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Function to fetch rooms from the API
    const fetchRooms = async () => {
      try {
        const rooms = await fetchAllRooms();
        setRooms(rooms); // Set the rooms state with fetched data
      } catch (err) {
        console.error('Failed to fetch rooms', err);
      }
    };

    fetchRooms(); // Fetch rooms when the component mounts
  }, []);

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
  };

  // Handler for difficulty filter change
  const handleDifficultyChange = (e) => {
    setDifficultyFilter(e.target.value); // Update the difficulty filter state
  };

  // Handler for starting a room
  const handleStartRoom = (roomId) => {
    console.log(`Starting room with ID: ${roomId}`);
    alert(`Starting room with ID: ${roomId}`);
    navigate(`/rooms-two/${roomId}`);
    // Implement the logic to start the room here
  };

  // Filter rooms based on search term and difficulty filter
  const filteredRooms = rooms.filter((room) => {
    return (
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (difficultyFilter === '' || room.difficulty === difficultyFilter)
    );
  });

  return (
    <>
    <DrawerAppBar/>
      <Container maxWidth="md">
        <Typography variant="h5" className="header">
          Rooms List
        </Typography>
        <TextField
          label="Search Rooms"
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
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Difficulty</TableCell>
                <TableCell>Points</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.roomId} className="table-row">
                  <TableCell component="th" scope="row">
                    {room.name}
                  </TableCell>
                  <TableCell>{room.description}</TableCell>
                  <TableCell>{room.difficulty}</TableCell>
                  <TableCell>{room.points}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleStartRoom(room.roomId)}
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
      </>
  );
};

export default RoomsList;

