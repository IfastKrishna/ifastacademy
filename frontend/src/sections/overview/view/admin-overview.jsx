import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import { useRouter } from 'src/routes/hooks';
import useGetStudentsCount from 'src/libs/query/student/useStudentCount';
import useGetEmployeesCount from 'src/libs/query/employee/useEmployeesCount';
import useGetTodayBirthdaysCount from 'src/libs/query/user/useGetTodayBirthdaysCount';
import HideComponent from 'src/components/Hide/hide';
import useTodayFollowup from 'src/libs/query/dashboard/useTodayFollowup';
import useTodayAdmission from 'src/libs/query/dashboard/todayAdmistion';
import useTotalDropoutStudent from 'src/libs/query/dashboard/useTotalDropoutStudent';
import { Box, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { fDate } from 'src/utils/format-time';
import useTotalCollectedFeeInThisMonth from 'src/libs/query/dashboard/useTotalCollectedFeeInThisMonth';
import useTodayCollectedFee from 'src/libs/query/dashboard/useTodayCollectedFee';

// ----------------------------------------------------------------------

export default function AdminOverview() {
  const router = useRouter();
  const { data: students } = useGetStudentsCount();
  const { data: employees } = useGetEmployeesCount();
  const { data: todayBirthdays } = useGetTodayBirthdaysCount();
  const todayFollowup = useTodayFollowup()?.data;
  const todayAdmission = useTodayAdmission()?.data;
  const dropoutStudents = useTotalDropoutStudent()?.data;
  const totalCalculatedFees = useTotalCollectedFeeInThisMonth()?.data;
  const todayCalculatedFees = useTodayCollectedFee()?.data;

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

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <HideComponent roles={['admin', 'superadmin', 'employee']}>
          <Grid xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Collected Fee In This Month"
              total={totalCalculatedFees?.total}
              color="success"
              icon={<img alt="icon" src="/assets/icons/ic_money_bag.svg" />}
            />
          </Grid>
        </HideComponent>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Today Collected Fee"
            total={todayCalculatedFees?.total}
            color="error"
            icon={<img alt="icon" src="/assets/icons/ic_money_bag.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Student"
            onClick={() => router.push('/student/all')}
            total={students?.count || 0}
            color="info"
            icon={
              <img
                alt="icon"
                src="/assets/icons/navbar/ic_student.svg"
                style={{ width: '60px', height: '60px' }}
              />
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Dropout Student"
            total={dropoutStudents?.count}
            color="info"
            icon={
              <img
                alt="icon"
                src="/assets/icons/ic_user-minus.svg"
                style={{ width: '60px', height: '60px' }}
              />
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Staff"
            total={employees?.count || 0}
            onClick={() => router.push('/employee/all')}
            color="info"
            icon={
              <img
                alt="icon"
                src="/assets/icons/navbar/ic_teacher.svg"
                style={{ width: '60px', height: '60px' }}
              />
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Today Followup"
            total={todayFollowup?.count}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_folllowups.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Today Admission"
            total={todayAdmission?.count}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_user_check.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Happy Birthday"
            total={todayBirthdays?.count}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_happybirthday.svg" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Resource Issue"
            total={5}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/navbar/ic_laptop.svg" />}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'Present', value: 26 },
                { label: 'Absent', value: 4 },
                { label: 'Holyday', value: 4 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
      <Box component={Paper} sx={{ py: 3, px: 2, mt: 3, maxHeight: 400, width: '100%' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          Today Followups
        </Typography>

        <DataGrid
          rows={todayFollowup?.data || []}
          getRowId={(row) => row?._id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          // pageSizeOptions={[5, 10, 20]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}
