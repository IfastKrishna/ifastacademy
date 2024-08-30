import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import AttendanceCard from 'src/components/attendance_card';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import AppCurrentVisits from 'src/sections/overview/app-current-visits';

function StudentAttendanceVew() {
  const user = useIsAuth()?.data?.data;
  return (
    <Container>
      <Typography variant="h5" sx={{ my: 2 }}>
        Current Month Attendance
      </Typography>
      <AttendanceCard />
      <Typography variant="h5" sx={{ my: 2 }}>
        Monthly Attendance Report
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="July"
            chart={{
              series: [
                { label: 'Present', value: 20 },
                { label: 'Absent', value: 10 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="June"
            chart={{
              series: [
                { label: 'Present', value: 26 },
                { label: 'Absent', value: 4 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="May"
            chart={{
              series: [
                { label: 'Present', value: 30 },
                { label: 'Absent', value: 0 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default StudentAttendanceVew;
