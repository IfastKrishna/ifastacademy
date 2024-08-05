import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'enquire',
    path: '/enquire/all',
    icon: icon('ic_user-plus'),
  },
  {
    title: 'followup',
    icon: icon('ic_followup'),
    path: '/followup/all',
  },
  {
    title: 'user',
    path: '/user/all',
    icon: icon('ic_user'),
  },
  {
    title: 'student',
    icon: icon('ic_student'),
    path: '/student/all',
  },
  {
    title: 'employee',
    icon: icon('ic_teacher'),
    path: '/employee/all',
  },
  // {
  //   title: 'products',
  //   icon: icon('ic_cart'),
  //   path: '/products',
  // },
  {
    title: 'master',
    icon: icon('ic_master'),
    path: '/masters',
  },
  {
    title: 'student fees',
    icon: icon('ic_fee'),
    path: '/student-fee/all',
  },
  {
    title: 'batch-attendance',
    icon: icon('ic_calendar-add'),
    path: '/batch-attendance/all',
  },
];

export default navConfig;
