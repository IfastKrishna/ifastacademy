import useIsAuth from 'src/libs/query/isAuth/useIsAuth';
import AdminOverview from './admin-overview';
import EmployeeOverview from './employee-overview';
import StudentOverview from './student-overview';

export default function AppView() {
  const user = useIsAuth()?.data?.data;
  return user?.role === 'admin' || user?.role === 'superadmin' ? (
    <AdminOverview />
  ) : user?.role === 'employee' ? (
    <EmployeeOverview />
  ) : user?.role === 'student' ? (
    <StudentOverview />
  ) : null;
}
