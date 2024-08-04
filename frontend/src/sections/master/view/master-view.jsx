import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import AppWidgetSummary from 'src/sections/overview/app-widget-summary';

function MasterView() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>Master View | IfastAcademy</title>
      </Helmet>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Master View
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Batches"
            total={4000}
            color="success"
            onClick={() => navigate('/masters-batch/all')}
            icon={<img alt="icon" src="/assets/icons/navbar/ic_fee.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Courses"
            total={5}
            color="success"
            onClick={() => navigate('/masters-course/all')}
            icon={<img alt="icon" src="/assets/icons/navbar/ic_fee.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Fee Categories"
            total={4}
            color="success"
            onClick={() => navigate('/masters-fee-category/all')}
            icon={<img alt="icon" src="/assets/icons/navbar/ic_fee.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Followup Modes"
            total={5}
            color="success"
            onClick={() => navigate('/masters-followup-mode/all')}
            icon={<img alt="icon" src="/assets/icons/navbar/ic_fee.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Lead Sources"
            total={10}
            color="success"
            onClick={() => navigate('/masters-lead-source/all')}
            icon={<img alt="icon" src="/assets/icons/navbar/ic_fee.svg" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default MasterView;
