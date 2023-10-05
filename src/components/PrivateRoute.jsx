import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ redirectTo }) => {
  const { token } = useSelector(state => state.auth);
  console.log(token);

  return token ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
