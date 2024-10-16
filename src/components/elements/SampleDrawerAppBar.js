import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from '@mui/material';
import { AccountCircleOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './DrawAppBar.css';

const SampleDrawerAppBar = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" className='appBar'>
        <Toolbar className='toolbar'>
          <div className='logoContainer'>
            <img
              src={require('../../assets/images/extended_logo.png')}
              alt="Capture the Future"
              className="logo"
            />
          </div>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            aria-controls="profile-menu"
            aria-haspopup="true"
          >
            <AccountCircleOutlined sx={{ fontSize: 35 }} />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            keepMounted
          >
            <MenuItem onClick={handleExit}>
              <ListItemText primary="Exit" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* Optional: Wrap children in a div with margin */}
      <div>
        {children}
      </div>
    </>
  );
};

export default SampleDrawerAppBar;
