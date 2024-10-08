import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, ListItemText, Drawer, List, ListItem, Typography, Box, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircleOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../networking/api'; // Assuming the API call logic exists in this file
import './DrawAppBar.css';
import '../../assets/images/ctf-logo.webp';

const DrawerAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [points, setPoints] = useState(null);  // State to store user points
  const [loadingPoints, setLoadingPoints] = useState(true);  // State to manage loading
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder for API call to fetch points
    const fetchUserPoints = async () => {
      try {
        // Simulate an API request to fetch points
        const response = await fetch('/api/user/points'); // Adjust this endpoint as needed
        const data = await response.json();
        setPoints(data.points);
      } catch (error) {
        console.error('Failed to fetch points', error);
      } finally {
        setLoadingPoints(false);
      }
    };

    fetchUserPoints();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setAnchorEl(null); // Close dropdown after navigating
    setDrawerOpen(false); // Close drawer if opened
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setAnchorEl(null); // Close dropdown after logging out
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open the dropdown
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the dropdown
  };

  return (
    <>
      <AppBar position="static" className='appBar'>
        <Toolbar className='toolbar'>
          <div>
               <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          </div>



          <div className='logoContainer'>
            <img src={require('../../assets/images/extended_logo.png')} alt="Capture the Future" className="logo" />
          </div>
          <div >          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {loadingPoints ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                {points} Points
                {console.log("There are " + points)}
              </Typography>
            )}
            <IconButton 
              color="inherit" 
              onClick={handleMenuOpen} 
              aria-controls="profile-menu"
              aria-haspopup="true"
            >
              <AccountCircleOutlined sx={{ fontSize: 35 }} /> 
            </IconButton>
          </Box></div>
          {/* Points display and profile icon */}

          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            keepMounted
          >
            <MenuItem onClick={() => handleNavigation('/student-dashboard/account-management')}>
              <ListItemText primary="Account Management" />
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/student-dashboard/past-competitions')}>
              <ListItemText primary="Past Competitions" />
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/student-dashboard/accessibility-options')}>
              <ListItemText primary="Accessibility Options" />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemText primary="Log Out" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer remains unchanged */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle} classes={{ paper: 'drawerPaper' }} >
        <List>
          <Typography className='heading' style={{ padding: '10px 13px', fontWeight: 'bold' }}>Competition Options</Typography>
          <ListItem button onClick={() => handleNavigation('/student-dashboard')}>
            <ListItemText primary="Competition Home Page" classes={{ primary: 'listItemText' }} />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/student-dashboard/challenges-list')}>
            <ListItemText primary="Challenges List" classes={{ primary: 'listItemText' }} />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/student-dashboard/leaderboard')}>
            <ListItemText primary="Leaderboard" classes={{ primary: 'listItemText' }} />
          </ListItem>

        </List>
      </Drawer>
    </>
  );
};
export default DrawerAppBar;