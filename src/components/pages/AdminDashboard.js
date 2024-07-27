import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [isEditChallengeModalOpen, setEditChallengeModalOpen] = useState(false);
  const [isDeleteChallengeModalOpen, setDeleteChallengeModalOpen] = useState(false);
  const [userFormData, setUserFormData] = useState({ name: '', email: '' });
  const [challengeFormData, setChallengeFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    // Mock data for users
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    ];
    setUsers(mockUsers);

    // Mock data for challenges
    const mockChallenges = [
      { id: 1, title: 'Challenge 1', description: 'Description for challenge 1' },
      { id: 2, title: 'Challenge 2', description: 'Description for challenge 2' },
      { id: 3, title: 'Challenge 3', description: 'Description for challenge 3' },
    ];
    setChallenges(mockChallenges);
  }, []);

  const handleOpenEditUserModal = (user) => {
    setCurrentUser(user);
    setUserFormData({ name: user.name, email: user.email });
    setEditUserModalOpen(true);
  };

  const handleOpenDeleteUserModal = (user) => {
    setCurrentUser(user);
    setDeleteUserModalOpen(true);
  };

  const handleOpenEditChallengeModal = (challenge) => {
    setCurrentChallenge(challenge);
    setChallengeFormData({ title: challenge.title, description: challenge.description });
    setEditChallengeModalOpen(true);
  };

  const handleOpenDeleteChallengeModal = (challenge) => {
    setCurrentChallenge(challenge);
    setDeleteChallengeModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditUserModalOpen(false);
    setDeleteUserModalOpen(false);
    setEditChallengeModalOpen(false);
    setDeleteChallengeModalOpen(false);
    setCurrentUser(null);
    setCurrentChallenge(null);
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
      user.id === currentUser.id ? { ...user, ...userFormData } : user
    );
    setUsers(updatedUsers);
    handleCloseModal();
  };

  const handleDeleteUser = () => {
    const updatedUsers = users.filter((user) => user.id !== currentUser.id);
    setUsers(updatedUsers);
    handleCloseModal();
  };

  const handleSaveChallenge = (e) => {
    e.preventDefault();
    const updatedChallenges = challenges.map((challenge) =>
      challenge.id === currentChallenge.id ? { ...challenge, ...challengeFormData } : challenge
    );
    setChallenges(updatedChallenges);
    handleCloseModal();
  };

  const handleDeleteChallenge = () => {
    const updatedChallenges = challenges.filter((challenge) => challenge.id !== currentChallenge.id);
    setChallenges(updatedChallenges);
    handleCloseModal();
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <ul className="userList">
        {users.map((user) => (
          <li key={user.id} className="userItem">
            <span>{user.name} - {user.email}</span>
            <div>
              <button className="button editButton" onClick={() => handleOpenEditUserModal(user)}>Edit</button>
              <button className="button deleteButton" onClick={() => handleOpenDeleteUserModal(user)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h1>Challenge Management</h1>
      <ul className="challengeList">
        {challenges.map((challenge) => (
          <li key={challenge.id} className="challengeItem">
            <span>{challenge.title} - {challenge.description}</span>
            <div>
              <button className="button editButton" onClick={() => handleOpenEditChallengeModal(challenge)}>Edit</button>
              <button className="button deleteButton" onClick={() => handleOpenDeleteChallengeModal(challenge)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {isEditUserModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>Edit User</h2>
            <form onSubmit={handleSaveUser}>
              <label>
                Name:
                <input type="text" name="name" value={userFormData.name} onChange={handleUserChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={userFormData.email} onChange={handleUserChange} />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCloseModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {isDeleteUserModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>Delete User</h2>
            <p>Are you sure you want to delete {currentUser?.name}?</p>
            <button onClick={handleDeleteUser}>Delete</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}

      {isEditChallengeModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>Edit Challenge</h2>
            <form onSubmit={handleSaveChallenge}>
              <label>
                Title:
                <input type="text" name="title" value={challengeFormData.title} onChange={handleChallengeChange} />
              </label>
              <label>
                Description:
                <input type="text" name="description" value={challengeFormData.description} onChange={handleChallengeChange} />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCloseModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {isDeleteChallengeModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>Delete Challenge</h2>
            <p>Are you sure you want to delete {currentChallenge?.title}?</p>
            <button onClick={handleDeleteChallenge}>Delete</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
