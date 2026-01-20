import React, {useEffect, useState} from 'react';
import api from '../services/api';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';

export default function FireMonitor(){
  const [alerts, setAlerts] = useState(null);

  useEffect(()=>{
    api.get('/api/v1/alerts/fire')
      .then(r=> setAlerts(r.data || []))
      .catch(()=> setAlerts([]))
  },[])

  return (
    <Container className="page-container">
      <Typography variant="h4" sx={{mb:2}}>Fire Monitor</Typography>
      <Paper>
        {alerts === null ? (
          <div style={{padding:24, display:'flex', justifyContent:'center'}}><CircularProgress /></div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Device</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Handled</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.map(a=> (
                <TableRow key={a.id}>
                  <TableCell>{a.id}</TableCell>
                  <TableCell>{a.device_id}</TableCell>
                  <TableCell>{a.type}</TableCell>
                  <TableCell>{a.value}</TableCell>
                  <TableCell>{new Date(a.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{String(a.handled)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  )
}
