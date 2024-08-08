import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import useGetBatchesCount from 'src/libs/query/master/batch-class/useBatchCount';
import useGetCoursesCount from 'src/libs/query/master/course/useCourseCount';
import useGetFeeCategoriesCount from 'src/libs/query/master/fee-categories/useFeeCategoryCount';
import useGetFollowupModesCount from 'src/libs/query/master/followup-mode/useFolloupModeCount';
import useGetLeadSourceCount from 'src/libs/query/master/leace-source/useGetLeadSourceCount';
import AppWidgetSummary from 'src/sections/overview/app-widget-summary';

function MasterView() {
  const navigate = useNavigate();
  const { data: batchCount } = useGetBatchesCount();
  const { data: courseCount } = useGetCoursesCount();
  const { data: feeCategoryCount } = useGetFeeCategoriesCount();
  const { data: followupModeCount } = useGetFollowupModesCount();
  const { data: leadSourceCount } = useGetLeadSourceCount();

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
            total={batchCount?.count || 0}
            color="success"
            onClick={() => navigate('/masters-batch/all')}
            icon={<img alt="icon" src="/assets/icons/navbar/ic_fee.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Courses"
            total={courseCount?.count || 0}
            color="success"
            onClick={() => navigate('/masters-course/all')}
            icon={<img alt="icon" src="/assets/icons/navbar/ic_fee.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Fee Categories"
            total={feeCategoryCount?.count || 0}
            color="success"
            onClick={() => navigate('/masters-fee-category/all')}
            icon={<img alt="icon" src="/assets/icons/navbar/ic_fee.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Followup Modes"
            total={followupModeCount?.count || 0}
            color="success"
            onClick={() => navigate('/masters-followup-mode/all')}
            icon={<img alt="icon" src="/assets/icons/navbar/ic_fee.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Lead Sources"
            total={leadSourceCount?.count || 0}
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
