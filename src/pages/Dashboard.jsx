import React from 'react';
import { Container, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import DashboardCard from '../components/DashboardCard';
import useFetch from './useFetch';
import './Dashboard.css';

export default function Dashboard() {
  const [health] = useFetch('/api/v1/health', { status: '...' });
  const [students] = useFetch('/api/v1/students', []);
  const [attendance, setAttendance] = useState([]);

  useEffect(()=>{
    // initial load
    fetch('/api/v1/attendance')
      .then(r=> r.json())
      .then(d=> setAttendance(d || []))
      .catch(()=> setAttendance([]))
  },[])

  // subscribe to realtime attendance
  useEffect(()=>{
    const ws = require('../services/ws').default;
    const unsub = ws.subscribe((payload)=>{
      if(payload?.type === 'attendance' && payload.data){
        setAttendance(prev=> [payload.data, ...prev].slice(0,200));
      }
    });
    return () => unsub();
  },[])

  const studentsCount = Array.isArray(students) ? students.length : '--';
  const attendancePct =
    Array.isArray(attendance) && studentsCount > 0
      ? `${Math.round((attendance.length / Math.max(1, studentsCount)) * 100)}%`
      : '--';

  return (
    <Container className="page-container">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Backend Health"
            value={health?.status || 'unreachable'}
            subtitle="API status"
            accent="#1976d2"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Total Students" value={studentsCount} subtitle="Registered students" accent="#00acc1" />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Today's Attendance"
            value={attendancePct}
            subtitle={`${attendance.length || 0} records`}
            accent="#2e7d32"
          />
        </Grid>

        {/* Recent Attendance Table */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Recent Attendance
          </Typography>
          <div className="dashboard-table-wrapper">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendance.slice(0, 10).map(({ id, student_id, method, location, timestamp }) => (
                  <TableRow key={id}>
                    <TableCell>{student_id}</TableCell>
                    <TableCell>{method}</TableCell>
                    <TableCell>{location}</TableCell>
                    <TableCell>{new Date(timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Quick Actions
          </Typography>
          <div className="dashboard-quick-actions">
            <p>• Use the Students page to view the full list.</p>
            <p>• Use Attendance for details and exports.</p>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
