import React from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import AppWidgetSummary from '../app-widget-summary';
import AttendanceCard from 'src/components/attendance_card';

function StudentOverview() {
  const user = useIsAuth()?.data?.data;
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome {user?.firstName}
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Paid Fees"
            total={2400}
            color="success"
            icon={<img alt="icon" src="/assets/icons/ic_hand_money.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Pending Fees"
            total={800}
            color="success"
            icon={<img alt="icon" src="/assets/icons/ic_wad_money.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Absent Days"
            total={8}
            color="success"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_calendar.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="My Batch"
            total={2}
            color="success"
            icon={<img alt="icon" src="/assets/icons/ic_book.svg" />}
          />
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
        My Attendance
      </Typography>
      <AttendanceCard />
    </Container>
  );
}

export default StudentOverview;
