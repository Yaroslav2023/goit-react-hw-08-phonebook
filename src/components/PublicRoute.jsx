import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ redirectTo = '/' }) => {
  const { token } = useSelector(state => state.auth);
  const shouldRedirect = token;
  return shouldRedirect ? (
    <Navigate to={redirectTo} />
  ) : (
    <Suspense fallback={<div>Load...</div>}>
      <Outlet />
    </Suspense>
  );
};

export default PublicRoute;
