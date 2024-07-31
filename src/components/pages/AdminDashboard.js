import React, { useState, useEffect } from 'react';
import { loadChallenges, getAllUsers } from '../networking/api';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Modal, Box, TextField } from '@mui/material';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [isEditChallengeModalOpen, setEditChallengeModalOpen] = useState(false);
  const [isDeleteChallengeModalOpen, setDeleteChallengeModalOpen] = useState(false);
  const [userFormData, setUserFormData] = useState({ name: '', email: '' });
  const [challengeFormData, setChallengeFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challenges = await loadChallenges();
        setChallenges(challenges);
      } catch (err) {
        console.error('Failed to fetch challenges', err);
      }
    }

    const fetchAllUsers = async () => {
      try {
        const users = await getAllUsers();
        setUsers(users);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    }

    // Mock data for users. Uncomment for testing purposes
    // const mockUsers = [
    //   { id: 1, name: 'John Doe', email: 'john@example.com' },
    //   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    //   { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    // ];
    // setUsers(mockUsers);

    // Mock data for challenges. Uncomment for testing purposes.
    // const mockChallenges = [
    //   { id: 1, title: 'Challenge 1', description: 'Description for challenge 1' },
    //   { id: 2, title: 'Challenge 2', description: 'Description for challenge 2' },
    //   { id: 3, title: 'Challenge 3', description: 'Description for challenge 3' },
    // ];
    // setChallenges(mockChallenges);

    fetchAllUsers();
    fetchChallenges();
  }, []);

  const handleOpenEditUserModal = (user) => {
    setSelectedUser(user);
    setUserFormData({ name: user.username, email: user.email });
    setEditUserModalOpen(true);
  };

  const handleOpenDeleteUserModal = (user) => {
    setSelectedUser(user);
    setDeleteUserModalOpen(true);
  };

  const handleOpenEditChallengeModal = (challenge) => {
    setSelectedChallenge(challenge);
    setChallengeFormData({ title: challenge.name, description: challenge.description });
    setEditChallengeModalOpen(true);
  };

  const handleOpenDeleteChallengeModal = (challenge) => {
    setSelectedChallenge(challenge);
    setDeleteChallengeModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditUserModalOpen(false);
    setDeleteUserModalOpen(false);
    setEditChallengeModalOpen(false);
    setDeleteChallengeModalOpen(false);
    setSelectedUser(null);
    setSelectedChallenge(null);
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChallengeChange = (e) => {
    const { name, value } = e.target;
    setChallengeFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    const updatedUsers = users.map((user) =>
      user.userId === selectedUser.userId ? { ...user, ...userFormData } : user
    );
    setUsers(updatedUsers);
    handleCloseModal();
  };

  const handleDeleteUser = () => {
    const updatedUsers = users.filter((user) => user.userId !== selectedUser.userId);
    setUsers(updatedUsers);
    handleCloseModal();
  };

  const handleSaveChallenge = (e) => {
    e.preventDefault();
    const updatedChallenges = challenges.map((challenge) =>
      challenge.challengeId === selectedChallenge.challengeId ? { ...challenge, ...challengeFormData } : challenge
    );
    setChallenges(updatedChallenges);
    handleCloseModal();
  };

  const handleDeleteChallenge = () => {
    const updatedChallenges = challenges.filter((challenge) => challenge.challengeId !== selectedChallenge.challengeId);
    setChallenges(updatedChallenges);
    handleCloseModal();
  };

  return (
    <><header className="login-header">
      <img src={require('../../assets/images/extended_logo.png')} alt="Capture the Future" className="logo" />
    </header><Container maxWidth="md">
        <h1>Admin Dashboard</h1>

        <h3>User Management</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userId} className="table-row">
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => handleOpenEditUserModal(user)}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleOpenDeleteUserModal(user)} style={{ marginLeft: '10px' }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h3>Challenge Management</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {challenges.map((challenge) => (
                <TableRow key={challenge.challengeId} className="table-row">
                  <TableCell component="th" scope="row">
                    {challenge.name}
                  </TableCell>
                  <TableCell align="center">{challenge.description}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => handleOpenEditChallengeModal(challenge)}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleOpenDeleteChallengeModal(challenge)} style={{ marginLeft: '10px' }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={isEditUserModalOpen} onClose={handleCloseModal}>
          <Box className="modalContent">
            <Typography variant="h6">Edit User</Typography>
            <form onSubmit={handleSaveUser}>
              <TextField fullWidth margin="normal" name="name" label="Name" value={userFormData.name} onChange={handleUserChange} />
              <TextField fullWidth margin="normal" name="email" label="Email" value={userFormData.email} onChange={handleUserChange} />
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button type="submit" variant="contained" color="primary">Save</Button>
                <Button onClick={handleCloseModal} variant="contained" style={{ marginLeft: '10px' }}>Cancel</Button>
              </Box>
            </form>
          </Box>
        </Modal>

        <Modal open={isDeleteUserModalOpen} onClose={handleCloseModal}>
          <Box className="modalContent">
            <Typography variant="h6">Delete User</Typography>
            <Typography>Are you sure you want to delete {selectedUser?.username}?</Typography>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={handleDeleteUser} variant="contained" color="secondary">Delete</Button>
              <Button onClick={handleCloseModal} variant="contained" style={{ marginLeft: '10px' }}>Cancel</Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={isEditChallengeModalOpen} onClose={handleCloseModal}>
          <Box className="modalContent">
            <Typography variant="h6">Edit Challenge</Typography>
            <form onSubmit={handleSaveChallenge}>
              <TextField fullWidth margin="normal" name="title" label="Title" value={challengeFormData.title} onChange={handleChallengeChange} />
              <TextField fullWidth margin="normal" name="description" label="Description" value={challengeFormData.description} onChange={handleChallengeChange} />
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button type="submit" variant="contained" color="primary">Save</Button>
                <Button onClick={handleCloseModal} variant="contained" style={{ marginLeft: '10px' }}>Cancel</Button>
              </Box>
            </form>
          </Box>
        </Modal>

        <Modal open={isDeleteChallengeModalOpen} onClose={handleCloseModal}>
          <Box className="modalContent">
            <Typography variant="h6">Delete Challenge</Typography>
            <Typography>Are you sure you want to delete {selectedChallenge?.name}?</Typography>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={handleDeleteChallenge} variant="contained" color="secondary">Delete</Button>
              <Button onClick={handleCloseModal} variant="contained" style={{ marginLeft: '10px' }}>Cancel</Button>
            </Box>
          </Box>
        </Modal>
      </Container></>
  );
};

export default AdminDashboard;
