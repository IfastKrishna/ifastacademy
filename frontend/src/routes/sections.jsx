import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import ProtectedRoute from '../components/protacted-route';

import { StudentCreate } from 'src/sections/students/create';
import { StudentEdit } from 'src/sections/students/edit';
import { EmployeeCreate } from 'src/sections/staffs/create';
import { EmployeeEdit } from 'src/sections/staffs/edit';
import { EmployeeView } from 'src/sections/staffs/view';
import { MasterView } from 'src/sections/master/view';

import { CourseEnquireView } from 'src/sections/course-enquire/view';
import { ClassView } from 'src/sections/master/class/view';
import { CourseCreate } from 'src/sections/master/course/create';
import { CourseEdit } from 'src/sections/master/course/edit';
import { CourseView } from 'src/sections/master/course/view';
import { FeeCategoryView } from 'src/sections/master/fee-category/view';
import { FeeCategoryCreate } from 'src/sections/master/fee-category/create';
import { FeeCategoryEdit } from 'src/sections/master/fee-category/edit';
import { FollowupModeCreate } from 'src/sections/master/followup-mode/create';
import { FollowupModeEdit } from 'src/sections/master/followup-mode/edit';
import { FollowupModeView } from 'src/sections/master/followup-mode/view';
import { LeadSourceCreate } from 'src/sections/master/lead-source/create';
import { LeadSourceEdit } from 'src/sections/master/lead-source/edit';
import { LeadSourceView } from 'src/sections/master/lead-source/view';
import { ClassCreate } from 'src/sections/master/class/create';
import { ClassEdit } from 'src/sections/master/class/edit';
import { CreateStudentFee } from 'src/sections/student-fee/create';
import { EditStudentFee } from 'src/sections/student-fee/edit';
import StudentFeesView from 'src/sections/student-fee/view/student-fee-view';
import TakeBatchAttendance from 'src/sections/batch-attendance/teake/take-batch-attendance';
import EditBatchAttendance from 'src/sections/batch-attendance/edit/edit-batch-attendance';
import BatchAttendanceView from 'src/sections/batch-attendance/view/batch-attendance-view';
import { UserCreate } from 'src/sections/user/create';
import { CourseEnquireCreate } from 'src/sections/course-enquire/create';
import { CourseEnquiresEdit } from 'src/sections/course-enquire/edit';
import NewAdmission from 'src/sections/students/new-admision/new-adminsion';
import { FollowupCreate } from 'src/sections/followups/create';
import { FollowupView } from 'src/sections/followups/view';
import { FollowupEdit } from 'src/sections/followups/edit';
import { SubmittedFees } from 'src/sections/students/submitted-fees';
import { StudentAttendanceView } from 'src/sections/students/attendance';
import { StudentMyBatchView } from 'src/sections/students/my-batch/view';
import { ProfileEdit } from 'src/sections/profile/edit';
import Security from 'src/sections/profile/security/security';
import BatchCourseView from 'src/sections/batch-course/view/batch-course-vew';
import { BatchWiseAttendance, BatchWiseFee } from 'src/sections/batch-wise';

export const Page404 = lazy(() => import('../pages/page-not-found'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const IndexPage = lazy(() => import('../pages/app'));
export const UserPage = lazy(() => import('../pages/user'));
export const StudentPage = lazy(() => import('../pages/students'));
export const StaffPage = lazy(() => import('../pages/staff'));
export const ProfilePage = lazy(() => import('../pages/profile'));
export const Setting = lazy(() => import('../pages/setting'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        {
          path: 'enquire',
          element: <Outlet />,
          children: [
            {
              path: 'create',
              element: <CourseEnquireCreate />,
            },
            {
              path: 'view/:id',
              element: <CourseEnquiresEdit />,
            },
            {
              path: 'edit/:id',
              element: <CourseEnquiresEdit />,
            },
            {
              path: 'all',
              element: <CourseEnquireView />,
            },
          ],
        },
        {
          path: 'user',
          element: <Outlet />,
          children: [
            {
              path: 'create',
              element: <UserCreate />,
            },
            {
              path: 'view/:id',
              element: <h1>View User</h1>,
            },
            {
              path: 'edit/:id',
              element: <h1>Edit User</h1>,
            },
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <UserPage />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'student',
          element: <Outlet />,
          children: [
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'employee', 'superadmin']}>
                  <StudentCreate />
                </ProtectedRoute>
              ),
            },
            {
              path: 'new-admission/:id',
              element: (
                <ProtectedRoute roles={['admin', 'employee', 'superadmin']}>
                  <NewAdmission />
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'employee', 'superadmin']}>
                  <StudentEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'employee', 'superadmin']}>
                  <StudentEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'employee', 'superadmin']}>
                  <StudentPage />
                </ProtectedRoute>
              ),
            },
            {
              path: 'fees',
              element: <SubmittedFees />,
            },
            {
              path: 'batch',
              element: <StudentMyBatchView />,
            },
            {
              path: 'attendance',
              element: <StudentAttendanceView />,
            },
          ],
        },

        {
          path: 'employee',
          element: <Outlet />,
          children: [
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <EmployeeCreate />
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <EmployeeEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <EmployeeEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <EmployeeView />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'masters',
          element: <MasterView />,
        },
        {
          path: 'masters-followup-mode',
          element: <Outlet />,
          children: [
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <FollowupModeCreate />
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <FollowupModeEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <FollowupModeEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <FollowupModeView />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'masters-lead-source',
          element: <Outlet />,
          children: [
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <LeadSourceCreate />
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <LeadSourceEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <LeadSourceEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <LeadSourceView />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: '/masters-batch',
          element: <Outlet />,
          children: [
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <ClassCreate />
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <ClassEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <ClassEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <ClassView />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'masters-course',
          element: <Outlet />,
          children: [
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <CourseCreate />
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <CourseEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <CourseEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <CourseView />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'masters-fee-category',
          element: <Outlet />,
          children: [
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <FeeCategoryCreate />
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <FeeCategoryEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <FeeCategoryEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <FeeCategoryView />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'student-fee',
          element: <Outlet />,
          children: [
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'employee']}>
                  <StudentFeesView />
                </ProtectedRoute>
              ),
            },
            {
              path: 'create/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'employee']}>
                  <CreateStudentFee />
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'employee']}>
                  <EditStudentFee />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'employee']}>
                  <EditStudentFee />
                </ProtectedRoute>
              ),
            },
            {
              path: 'batch',
            },
          ],
        },
        {
          path: 'batch-wise',
          element: <Outlet />,
          children: [
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'employee']}>
                  <BatchAttendanceView />
                </ProtectedRoute>
              ),
            },
            {
              path: 'take/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'employee']}>
                  <TakeBatchAttendance />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'employee']}>
                  <BatchWiseAttendance />
                </ProtectedRoute>
              ),
            },

            {
              path: 'attendance',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'employee']}>
                  <BatchWiseAttendance />
                </ProtectedRoute>
              ),
            },
            {
              path: 'fee',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'employee']}>
                  <BatchWiseFee />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'followup',
          element: <Outlet />,
          children: [
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'employee']}>
                  <FollowupView />
                </ProtectedRoute>
              ),
            },
            {
              path: 'create/:collection/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'teacher']}>
                  <FollowupCreate />
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'teacher']}>
                  <FollowupEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'teacher']}>
                  <FollowupEdit />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: 'products',
          element: (
            <ProtectedRoute roles={['admin', 'superadmin']}>
              <ProductsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'profile',
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <ProfilePage />,
            },
            {
              path: 'edit',
              element: <ProfileEdit />,
            },
            {
              path: 'security',
              element: <Security />,
            },
          ],
        },
        {
          path: 'my-batch-course',
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <BatchCourseView />,
            },
          ],
        },
        { path: 'settings', element: <Setting /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
