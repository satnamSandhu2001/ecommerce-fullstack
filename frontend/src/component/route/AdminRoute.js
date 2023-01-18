import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = (props) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (isAuthenticated === false || user.role !== 'admin') {
    return <Navigate replace to="/login" />;
  }

  return loading === false && <Outlet />;
};

export default AdminRoute;
