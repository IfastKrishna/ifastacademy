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

import { FollowupCreate } from 'src/sections/followups/view';
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

export const Page404 = lazy(() => import('../pages/page-not-found'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const IndexPage = lazy(() => import('../pages/app'));
export const UserPage = lazy(() => import('../pages/user'));
export const StudentPage = lazy(() => import('../pages/students'));
export const StaffPage = lazy(() => import('../pages/staff'));

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
              element: <h1>Create Enquire</h1>,
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'teacher', 'superadmin']}>
                  <h1>View Enquire</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'teacher', 'superadmin']}>
                  <h1>Edit Enquire</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'teacher', 'superadmin']}>
                  <CourseEnquireView />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'user',
          element: <Outlet />,
          children: [
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Create User</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>View User</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Edit User</h1>
                </ProtectedRoute>
              ),
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
                <ProtectedRoute roles={['admin', 'teacher', 'superadmin']}>
                  <StudentCreate />
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'teacher', 'superadmin']}>
                  <StudentEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'teacher', 'superadmin']}>
                  <StudentEdit />
                </ProtectedRoute>
              ),
            },
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'teacher', 'superadmin']}>
                  <StudentPage />
                </ProtectedRoute>
              ),
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
                  <h1>Create Class</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>View Class</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Edit Class</h1>
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
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Student Fees</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Create Student Fee</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>View Student Fee</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Edit Student Fee</h1>
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'batch-attendance',
          element: <Outlet />,
          children: [
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Batch Attendance</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'take',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Create Batch Attendance</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>View Batch Attendance</h1>
                </ProtectedRoute>
              ),
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Edit Batch Attendance</h1>
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
                <ProtectedRoute roles={['admin', 'superadmin', 'teacher']}>
                  <FollowupCreate />
                </ProtectedRoute>
              ),
            },
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'teacher']}>
                  <h1>Create Followup</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'teacher']}>
                  <h1>View Followup</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin', 'teacher']}>
                  <h1>Edit Followup</h1>
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
        { path: 'profile', element: <h1>Profile</h1> },
        { path: 'settings', element: <h1>Settings</h1> },
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
