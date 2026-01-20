import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import Logo from '../assets/logo.svg';
import './Login.css'; // external CSS for additional styling

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ok = await login(username, password);
      if (ok) {
        toast.success('Logged in successfully!');
        navigate('/');
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      toast.error('Login error. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Box className="login-hero">
        <img src={Logo} alt="Smart University Logo" className="login-logo" />

        <Paper className="login-card" elevation={6}>
          <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 700 }}>
            Admin Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
