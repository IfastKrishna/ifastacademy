import { Box, Container, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import { useRouter } from 'src/routes/hooks';
import AppWidgetSummary from '../app-widget-summary';
import { DataGrid } from '@mui/x-data-grid';

import useTotalAdmissionInThisMonth from 'src/libs/query/dashboard/useTotalAdmission';
import useTodayAdmission from 'src/libs/query/dashboard/todayAdmistion';
import useMyTotalBatch from 'src/libs/query/dashboard/useMyTotalBatch';
import useTotalDropoutStudent from 'src/libs/query/dashboard/useTotalDropoutStudent';
import useTodayFollowup from 'src/libs/query/dashboard/useTodayFollowup';
import useTotalCollectedFeeInThisMonth from 'src/libs/query/dashboard/useTotalCollectedFeeInThisMonth';
import useTodayCollectedFee from 'src/libs/query/dashboard/useTodayCollectedFee';
import useMyIncome from 'src/libs/query/dashboard/useMyIncone';

function EmployeeOverview() {
  const columns = [
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row?.leadDetails?.firstName || ''} ${row?.leadDetails?.lastName || ''}`,
    },
    {
      field: 'Phone number',
      valueGetter: (value, row) => row?.leadDetails?.phoneNo,
      headerName: 'Phone number',
      type: 'number',
      width: 150,
      // editable: true,
    },
    {
      field: 'AssignedTo',
      headerName: 'Assigned To',
      valueGetter: (value, row) =>
        `${row?.assignedTo?.firstName} ${row?.assignedTo?.lastName}- ${row?.assignedTo?.ifastId}`,
    },
    {
      field: 'Notes',
      headerName: 'Notes',
      width: 200,
      valueGetter: (value, row) => row?.notes,
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 150,
      valueGetter: (value, row) => fDate(row?.dueDate),
    },

    {
      field: 'FollowupDetails',
      headerName: 'Followup Details',
      width: 200,
      valueGetter: (value, row) => row?.followupDetails,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      valueGetter: (value, row) => row?.status,
    },
  ];

  const router = useRouter();
  const user = useIsAuth()?.data?.data;

  const totalAdmissionInMonth = useTotalAdmissionInThisMonth({
    id: user?._id,
    role: user?.role,
  })?.data;

  const totalAdmissionToday = useTodayAdmission({
    id: user?._id,
    role: user?.role,
  })?.data;

  const myTotalBatch = useMyTotalBatch().data;
  const dropoutStudents = useTotalDropoutStudent().data;
  const todayFollowups = useTodayFollowup().data;
  const totalCalculatedFees = useTotalCollectedFeeInThisMonth()?.data;
  const todayCalculatedFees = useTodayCollectedFee()?.data;
  const myIncome = useMyIncome()?.data;

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome {user?.firstName}
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Total Collected Fees In Month"
            total={totalCalculatedFees?.total}
            color="success"
            // onClick={() => router.push('/student/fees')}
            icon={<img alt="icon" src="/assets/icons/ic_money_bag.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Today Collected Fees"
            total={todayCalculatedFees?.total}
            color="success"
            // onClick={() => router.push('/student/fees')}
            icon={<img alt="icon" src="/assets/icons/ic_money_bag.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="My Expenses"
            total={0}
            color="success"
            icon={<img alt="icon" src="/assets/icons/ic_hand_money.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="My Income"
            total={myIncome?.data}
            color="success"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_fee.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="My Batch"
            total={myTotalBatch?.count}
            // onClick={() => router.push('/assigned/batch')}
            color="success"
            icon={<img alt="icon" src="/assets/icons/ic_batch.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Dropout Students"
            total={dropoutStudents?.count}
            // onClick={() => router.push('/assigned/batch')}
            color="success"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_student.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Joined Students In Month"
            total={totalAdmissionInMonth?.count}
            // onClick={() => router.push('/assigned/batch')}
            color="success"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_student.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Joined Students In Today"
            total={totalAdmissionToday?.count}
            // onClick={() => router.push('/assigned/batch')}
            color="success"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_student.svg" />}
          />
        </Grid>
      </Grid>

      <Box component={Paper} sx={{ mt: 3, py: 3, px: 2, maxHeight: 400, width: '100%' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Todays Followups
        </Typography>
        <DataGrid
          rows={todayFollowups?.data || []}
          columns={columns}
          getRowId={(row) => row?._id}
          // initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 5,
          //     },
          //   },
          // }}
          // pageSizeOptions={[5, 10, 20]}
          // checkboxSelection
          // disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}

export default EmployeeOverview;
