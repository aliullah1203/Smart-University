import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import './DashboardCard.css';

export default function DashboardCard({ title, value, subtitle, accent }) {
  return (
    <Paper elevation={2} className="dashboard-card">
      <Box className="dashboard-card-content">
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        {subtitle && <Typography variant="body2">{subtitle}</Typography>}
      </Box>
      <Box className="dashboard-card-icon" style={{ backgroundColor: accent || '#0d47a1' }}>
        {String(title || '?').charAt(0)}
      </Box>
    </Paper>
  );
}
