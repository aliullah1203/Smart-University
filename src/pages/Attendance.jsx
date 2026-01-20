import React, {useEffect, useState} from 'react';
import api from '../services/api';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import wsClient from '../services/ws';

export default function Attendance(){
  const [logs, setLogs] = useState(null);

  useEffect(()=>{
    api.get('/api/v1/attendance')
      .then(r=> setLogs(r.data || []))
      .catch(()=> setLogs([]))
  
    // subscribe to realtime websocket messages
    const unsub = wsClient.subscribe((payload) => {
      if(payload?.type === 'attendance' && payload.data){
        setLogs((prev)=> [payload.data, ...prev].slice(0,200));
      }
    });
    return () => unsub();
  },[])

  return (
    <Container className="page-container">
      <Typography variant="h4" sx={{mb:2}}>Attendance</Typography>
      <Paper>
        {logs === null ? (
          <div style={{padding:24, display:'flex', justifyContent:'center'}}><CircularProgress /></div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Student</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map(l=> (
                <TableRow key={l.id}>
                  <TableCell>{l.id}</TableCell>
                  <TableCell>{l.student_id}</TableCell>
                  <TableCell>{l.method}</TableCell>
                  <TableCell>{l.location}</TableCell>
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
