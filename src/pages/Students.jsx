import React, {useEffect, useState} from 'react';
import api from '../services/api';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';

export default function Students(){
  const [students, setStudents] = useState(null);

  useEffect(()=>{
    api.get('/api/v1/students')
      .then(r=> setStudents(r.data || []))
      .catch(()=> setStudents([]))
  },[])

  return (
    <Container className="page-container">
      <Typography variant="h4" sx={{mb:2}}>Students</Typography>
      <Paper>
        {students === null ? (
          <div style={{padding:24, display:'flex', justifyContent:'center'}}><CircularProgress /></div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Enrollment</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(s=> (
                <TableRow key={s.id}>
                  <TableCell>{s.id}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.enrollment_no}</TableCell>
                  <TableCell>{new Date(s.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  )
}
