import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute({ roles }) {
  const useIsLogin = () => ({
    role: 'superadmin',
    name: 'krishna',
    email: 'krishna@gmail.om',
    phoneNo: '1234567890',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
  });

  const user = useIsLogin();
  const hasRequiredRole = roles.includes(user.role);

  //   console.log(user);
  //   console.log(hasRequiredRole);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {hasRequiredRole ? <Outlet /> : <Navigate to="/login" />}
    </Suspense>
  );
}

ProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
