import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/logo.svg';
import './TopBar.css';

export default function TopBar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <Box className="topbar-container" sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="topbar-appbar">
        <Toolbar className="topbar-toolbar">
          {/* Logo + Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src={Logo} alt="Smart University Logo" className="topbar-logo" />
            <Typography variant="h5" component="div" className="topbar-title" sx={{ ml: 1 }}>
              Smart University
            </Typography>
          </Box>

          {/* Navigation Buttons */}
          <Box className="topbar-buttons">
            {token ? (
              <>
                <Button color="inherit" component={RouterLink} to="/">Dashboard</Button>
                <Button color="inherit" component={RouterLink} to="/attendance">Attendance</Button>
                <Button color="inherit" component={RouterLink} to="/gatelogs">Gate Logs</Button>
                <Button color="inherit" component={RouterLink} to="/fire">Fire</Button>
                <Button color="inherit" component={RouterLink} to="/students">Students</Button>
                <Button color="inherit" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                <Button color="inherit" component={RouterLink} to="/register">Register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
