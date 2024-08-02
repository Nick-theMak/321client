import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../networking/api';
import './DrawAppBar.css';
import '../../assets/images/ctf-logo.webp';


const AdminDrawerAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  }

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
          <Button color="inherit" onClick={() => navigate('/competition-list')}>Competition</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle} classes={{ paper: 'drawerPaper' }} >
        <List>
          <ListItem button onClick={() => handleLogout()}>
            <ListItemText primary="Log Out" classes={{ primary: 'listItemText' }} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default AdminDrawerAppBar;
