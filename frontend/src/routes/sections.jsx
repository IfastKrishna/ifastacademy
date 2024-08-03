import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import ProtectedRoute from '../components/protacted-route';
import Master from 'src/pages/master';

export const Page404 = lazy(() => import('../pages/page-not-found'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const IndexPage = lazy(() => import('../pages/app'));
export const UserPage = lazy(() => import('../pages/user'));
export const StudentPage = lazy(() => import('../pages/students'));
export const StaffPage = lazy(() => import('../pages/staff'));
export const MasterPage = lazy(() => import('../pages/master'));
// export const ClassesPage = lazy(() => import('../pages/classes'));
// export const BatchesPage = lazy(() => import('../pages/batches'));
// export const CoursesPage = lazy(() => import('../pages/courses'));
// export const FeeCategoriesPage = lazy(() => import('../pages/fee-categories'));
// export const LeadSourcesPage = lazy(() => import('../pages/lead-sources'));

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
          path: 'enquiry',
          element: <Outlet />,
          children: [
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'teacher', 'superadmin', 'student', 'user']}>
                  <h1>Create Enquire</h1>
                </ProtectedRoute>
              ),
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
                  <h1>Enquires</h1>
                  <Outlet />
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
                  <h1>Create Student</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'teacher', 'superadmin']}>
                  <h1>View Student</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'teacher', 'superadmin']}>
                  <h1>Edit Student</h1>
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
                  <h1>Create Staff</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>View Staff</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Edit Staff</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'all',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Employee</h1>
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: 'masters',
          element: (
            <>
              <MasterPage />
              <Outlet />
            </>
          ),
          children: [
            {
              path: 'class',
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
                      <h1>Classes</h1>
                    </ProtectedRoute>
                  ),
                },
              ],
            },
            {
              path: 'batch',
              element: <Outlet />,
              children: [
                {
                  path: 'create',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Create Batch</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'view/:id',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>View Batch</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'edit/:id',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Edit Batch</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'all',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Batches</h1>
                    </ProtectedRoute>
                  ),
                },
              ],
            },
            {
              path: 'course',
              element: <Outlet />,
              children: [
                {
                  path: 'create',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Create Course</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'view/:id',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>View Course</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'edit/:id',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Edit Course</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'all',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Courses</h1>
                    </ProtectedRoute>
                  ),
                },
              ],
            },
            {
              path: 'fee-category',
              element: <Outlet />,
              children: [
                {
                  path: 'create',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Create Fee Category</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'view/:id',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>View Fee Category</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'edit/:id',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Edit Fee Category</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'all',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Fee Categories</h1>
                    </ProtectedRoute>
                  ),
                },
              ],
            },
            {
              path: 'lead-source',
              element: <Outlet />,
              children: [
                {
                  path: 'create',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Create Lead Source</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'view/:id',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>View Lead Source</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'edit/:id',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Edit Lead Source</h1>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: 'all',
                  element: (
                    <ProtectedRoute roles={['admin', 'superadmin']}>
                      <h1>Lead Sources</h1>
                    </ProtectedRoute>
                  ),
                },
              ],
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
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Followups</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'create',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>Create Followup</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'view/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
                  <h1>View Followup</h1>
                </ProtectedRoute>
              ),
            },
            {
              path: 'edit/:id',
              element: (
                <ProtectedRoute roles={['admin', 'superadmin']}>
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
