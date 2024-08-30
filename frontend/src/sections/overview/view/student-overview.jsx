import React from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import AppWidgetSummary from '../app-widget-summary';
import AttendanceCard from 'src/components/attendance_card';
import useGetStudentMyBatch from 'src/libs/query/student/report/useGetMyBatch';
import useGetStudentTotalPaidFees from 'src/libs/query/student/report/useGetStudentPaidFee';
import { useRouter } from 'src/routes/hooks';
import useGetStudentCurrAttendance from 'src/libs/query/student/report/useGetStudentAteedance';

function StudentOverview() {
  const router = useRouter();
  const user = useIsAuth()?.data?.data;
  const batchesCount = useGetStudentMyBatch({ studentId: user?._id }).data?.count;
  const totalPaidFees = useGetStudentTotalPaidFees({ studentId: user?._id }).data?.totalPaid;
  const attendance = useGetStudentCurrAttendance({ studentId: user?._id }).data?.data;
  // console.log(attendance);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome {user?.firstName}
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Paid Fees"
            total={totalPaidFees}
            color="success"
            onClick={() => router.push('/student/fees')}
            icon={<img alt="icon" src="/assets/icons/ic_hand_money.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Absent Days"
            total={8}
            color="success"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_calendar.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="My Batch"
            total={batchesCount}
            onClick={() => router.push('/student/batch')}
            color="success"
            icon={<img alt="icon" src="/assets/icons/ic_batch.svg" />}
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
