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
    role: ['admin', 'manager', 'employee', 'superadmin', 'student'],
  },
  {
    title: 'user',
    path: '/user/all',
    icon: icon('ic_user'),
    role: ['superadmin'],
  },
  {
    title: 'enquire',
    path: '/enquire/all',
    icon: icon('ic_user-plus'),
    role: ['admin', 'manager', 'employee', 'superadmin'],
  },
  {
    title: 'followup',
    icon: icon('ic_followup'),
    path: '/followup/all',
    role: ['admin', 'manager', 'employee', 'superadmin'],
  },

  {
    title: 'student',
    icon: icon('ic_student'),
    path: '/student/all',
    role: ['admin', 'manager', 'employee', 'superadmin'],
  },
  {
    title: 'Staff',
    icon: icon('ic_teacher'),
    path: '/employee/all',
    role: ['admin', 'superadmin'],
  },
  // {
  //   title: 'products',
  //   icon: icon('ic_cart'),
  //   path: '/products',
  //   role: ['admin', 'superadmin'],
  // },
  {
    title: 'master',
    icon: icon('ic_master'),
    path: '/masters',
    role: ['admin', 'superadmin'],
  },
  {
    title: 'student fees',
    icon: icon('ic_fee'),
    path: '/student-fee/all',
    role: ['admin', 'employee', 'superadmin'],
  },
  {
    title: 'batch-attendance',
    icon: icon('ic_calendar-add'),
    path: '/batch-attendance/all',
    role: ['admin', 'employee', 'superadmin'],
  },

  {
    title: 'profile',
    path: '/profile',
    icon: icon('ic_profile'),
    role: ['student'],
  },
  {
    title: 'assignments',
    path: '/assignments/:id',
    icon: icon('ic_task'),
    role: ['student'],
  },
  {
    title: 'fees',
    path: '/fees/:id',
    icon: icon('ic_fee'),
    role: ['student', 'employee'],
  },
  {
    title: 'attendance',
    path: '/attendance/:id',
    icon: icon('ic_calendar'),
    role: ['student'],
  },
];

export default navConfig;
