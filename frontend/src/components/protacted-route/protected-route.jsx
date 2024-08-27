import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Outlet, Navigate } from 'react-router-dom';
import useIsAuth from 'src/libs/query/isAuth/useIsAuth';

function ProtectedRoute({ roles, children }) {
  const user = useIsAuth().data.data;
  const hasRequiredRole = roles.includes(user.role);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {hasRequiredRole ? children : <Navigate to="/login" />}
    </Suspense>
  );
}

ProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
