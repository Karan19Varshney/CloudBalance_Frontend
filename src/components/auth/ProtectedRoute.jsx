import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, redirectTo = "*" }) => {
  const role = useSelector((state) => state.user.Role);
  const normalizedRole = role?.trim().toUpperCase();
  const location = useLocation();

  return allowedRoles.includes(normalizedRole) ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;