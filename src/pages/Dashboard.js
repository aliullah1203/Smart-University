import React from "react";
import {
  Container,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import DashboardCard from "../components/DashboardCard";
import useFetch from "./useFetch";
import "./Dashboard.css";

export default function Dashboard() {
  const [health] = useFetch("/api/v1/health", { status: "..." });
  const [students] = useFetch("/api/v1/students", []);
  const [attendance] = useFetch("/api/v1/attendance", []);

  const studentsCount = Array.isArray(students) ? students.length : "--";
  const attendancePct =
    Array.isArray(attendance) && studentsCount > 0
      ? `${Math.round((attendance.length / Math.max(1, studentsCount)) * 100)}%`
      : "--";

  return (
    <Container className="page-container">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Smart University Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Backend Health"
            value={health?.status || "Unreachable"}
            subtitle="API connectivity and server status"
            accent="#0a75dfff"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Total Students"
            value={studentsCount}
            subtitle="Registered students in the system"
            accent="#07d2ecff"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Today's Attendance"
            value={attendancePct}
            subtitle={`${attendance.length || 0} records logged today`}
            accent="#56ee5eff"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <br />
          <br />
          <br />
          <Typography variant="h4" sx={{ mb: 3 }}>
            Latest Attendance Records
          </Typography>
          <div className="dashboard-table-wrapper">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Gate / Location</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendance
                  .slice(0, 10)
                  .map(({ id, student_id, method, location, timestamp }) => (
                    <TableRow key={id}>
                      <TableCell>{student_id}</TableCell>
                      <TableCell>{method}</TableCell>
                      <TableCell>{location}</TableCell>
                      <TableCell>
                        {new Date(timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          {/* Quick Actions */}
          <br />
          <br />
          <br />
          <Typography variant="h4" sx={{ mb: 3 }}>
            Quick Actions
          </Typography>
          <div className="dashboard-quick-actions">
            <p>
              • Navigate to <strong>Students</strong> to view and manage all
              student profiles.
            </p>
            <p>
              • Check <strong>Attendance</strong> for detailed daily and monthly
              logs.
            </p>
            <p>
              • Review <strong>Gate Logs</strong> to monitor campus entry and
              exit activity.
            </p>
            <p>
              • Stay updated with <strong>Fire Alerts</strong> for campus safety
              notifications.
            </p>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
