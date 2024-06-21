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
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'student',
    icon: icon('ic_student'),
    sub: [
      {
        title: 'add',
        path: '/student/add',
        icon: icon('ic_right-arrow'),
      },
      {
        title: 'update',
        path: '/student/update:_id',
        icon: icon('ic_right-arrow'),
      },
      {
        title: 'list',
        path: 'student/list',
        icon: icon('ic_right-arrow'),
      },
    ],
  },
  {
    title: 'product',
    icon: icon('ic_cart'),
    sub: [
      {
        title: 'add',
        path: 'product/add',
        icon: icon('ic_right-arrow'),
      },
      {
        title: 'update',
        path: '/product/update:_id',
        icon: icon('ic_right-arrow'),
      },
      {
        title: 'list',
        path: 'product/list',
        icon: icon('ic_right-arrow'),
      },
    ],
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
