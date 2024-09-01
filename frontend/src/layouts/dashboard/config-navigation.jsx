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
    role: ['admin', 'employee', 'superadmin'],
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
    title: 'My Batches',
    icon: icon('ic_task'),
    path: '/my-batch-course',
    role: ['employee'],
  },
  {
    title: 'Batch Wise Attendance',
    icon: icon('ic_calendar-add'),
    path: '/batch-wise/attendance',
    role: ['employee'],
  },
  {
    title: 'Batch Wise Fees',
    path: '/batch-wise/fee',
    icon: icon('ic_fee'),
    role: ['employee'],
  },

  {
    title: 'profile',
    path: '/profile',
    icon: icon('ic_profile'),
    role: ['student'],
  },
  {
    title: 'My Batches',
    path: '/student/batch',
    icon: icon('ic_task'),
    role: ['student'],
  },

  {
    title: 'My Fees',
    path: '/student/fees',
    icon: icon('ic_fee'),
    role: ['student'],
  },
  {
    title: 'attendance',
    path: 'student/attendance',
    icon: icon('ic_calendar'),
    role: ['student'],
  },
  {
    title: 'Security',
    path: 'profile/security',
    icon: icon('ic_security'),
    role: ['student', 'employee', 'admin', 'superadmin'],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: icon('ic_settings'),
    role: ['admin', 'superadmin', 'employee', 'student'],
  },
];

export default navConfig;
