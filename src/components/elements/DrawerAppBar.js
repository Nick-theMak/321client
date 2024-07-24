import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import './DrawAppBar.css';
import '../../assets/images/ctf-logo.webp';


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
      <AppBar position="static" className='appBar'>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon  />
          </IconButton>
          <div className='logoContainer'>
            <img src={require('../../assets/images/extended_logo.png')} alt="Capture the Future" className="logo" />
            {/* <Typography  variant="h6" style={{ flexGrow: 1 }} className='navBarHeader'>
            Capture the Future
            </Typography> */}
          </div>
          <Button color="inherit" onClick={() => navigate('/login')}>Sign In</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle} classes={{ paper: 'drawerPaper' }} >
        <List>

          <Typography className='heading' style={{ padding: '10px 13px', fontWeight: 'bold' }}>Competition Options</Typography>
        <ListItem button onClick={() => handleNavigation('/dashboard')}>
            <ListItemText primary="Competition Home Page" classes={{ primary: 'listItemText' }} />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/dashboard/challenges-list')}>
            <ListItemText primary="Challenges List" classes={{ primary: 'listItemText' }} />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/dashboard/leaderboard')}>
            <ListItemText primary="Leaderboard" classes={{ primary: 'listItemText' }} />
          </ListItem>

          {/* Spacer */}
          {/*<Divider className='divider' variant="middle" component="li"/>*/}
          
          {/* Profile options */}
          <Typography className='heading' style={{ padding: '10px 13px', fontWeight: 'bold'  }}>Profile Options</Typography>
          <ListItem button onClick={() => handleNavigation('/dashboard/account-management')}>
            <ListItemText primary="Account Management" classes={{ primary: 'listItemText' }} />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/dashboard/past-competitions')}>
            <ListItemText primary="Past Competitions" classes={{ primary: 'listItemText' }} />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/dashboard/accessability-options')}>
            <ListItemText primary="Accessibility Options" classes={{ primary: 'listItemText' }} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default DrawerAppBar;
