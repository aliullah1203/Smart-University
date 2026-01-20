import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import Logo from '../assets/logo.svg';
import { toast } from 'react-toastify';
import './Register.css'; // external CSS

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/v1/auth/signup', { username, password });
      if (res.status === 200) {
        toast.success('Account created successfully! Please login.');
        navigate('/login');
      } else {
        toast.error('Could not create account');
      }
    } catch (err) {
      const msg = err?.response?.data?.error || 'Signup failed';
      toast.error(msg);
    }
  };

  return (
    <Container maxWidth="sm" className="register-container">
      <Box className="register-hero">
        <img src={Logo} alt="Smart University Logo" className="register-logo" />

        <Paper className="register-card" elevation={6}>
          <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 700 }}>
            Register
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
              Create Account
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
