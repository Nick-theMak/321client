import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const DrawerAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Capture the Future
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login')}>Sign In</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button onClick={() => handleNavigation('/dashboard')}>
            <ListItemText primary="Competition Home Page" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/dashboard/challenges-list')}>
            <ListItemText primary="Challenges List" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/dashboard/leaderboard')}>
            <ListItemText primary="Leaderboard" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/dashboard/account-management')}>
            <ListItemText primary="Account Management" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/dashboard/past-competitions')}>
            <ListItemText primary="Past Competitions" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default DrawerAppBar;
