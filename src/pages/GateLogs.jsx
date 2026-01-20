import React, {useEffect, useState} from 'react';
import api from '../services/api';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import wsClient from '../services/ws';

export default function GateLogs(){
  const [logs, setLogs] = useState(null);

  useEffect(()=>{
    api.get('/api/v1/gate/log')
      .then(r=> setLogs(r.data || []))
      .catch(()=> setLogs([]))
  
    const unsub = wsClient.subscribe((payload) => {
      if(payload?.type === 'gate_log' && payload.data){
        setLogs((prev)=> [payload.data, ...prev].slice(0,200));
      }
    });
    return () => unsub();
  },[])

  return (
    <Container className="page-container">
      <Typography variant="h4" sx={{mb:2}}>Gate Logs</Typography>
      <Paper>
        {logs === null ? (
          <div style={{padding:24, display:'flex', justifyContent:'center'}}><CircularProgress /></div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Student</TableCell>
                <TableCell>Device</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map(l=> (
                <TableRow key={l.id}>
                  <TableCell>{l.id}</TableCell>
                  <TableCell>{l.student_id}</TableCell>
                  <TableCell>{l.device_id}</TableCell>
                  <TableCell>{l.action}</TableCell>
                  <TableCell>{new Date(l.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  )
}
