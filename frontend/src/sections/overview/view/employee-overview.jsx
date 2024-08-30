import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import { useRouter } from 'src/routes/hooks';
import AppWidgetSummary from '../app-widget-summary';

function EmployeeOverview() {
  const router = useRouter();
  const user = useIsAuth()?.data?.data;
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome {user?.firstName}
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Collected Fees"
            total={0}
            color="success"
            // onClick={() => router.push('/student/fees')}
            icon={<img alt="icon" src="/assets/icons/ic_money_bag.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Today Collected Fees"
            total={0}
            color="success"
            // onClick={() => router.push('/student/fees')}
            icon={<img alt="icon" src="/assets/icons/ic_money_bag.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="My Expenses"
            total={8}
            color="success"
            icon={<img alt="icon" src="/assets/icons/ic_hand_money.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="My Income"
            total={8}
            color="success"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_fee.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="My Batch"
            total={20}
            // onClick={() => router.push('/assigned/batch')}
            color="success"
            icon={<img alt="icon" src="/assets/icons/ic_batch.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Dropout Students"
            total={20}
            // onClick={() => router.push('/assigned/batch')}
            color="success"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_student.svg" />}
          />
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
        Monthly Report Summary
      </Typography>
    </Container>
  );
}

export default EmployeeOverview;
