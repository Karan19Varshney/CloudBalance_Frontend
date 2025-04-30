// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public pages
import Login from '../Pages/Login';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';

// Layout and route guards
import PrivateRoute from '../components/auth/PrivateRoute';
import RoleProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../Pages/Layout/Layout';

// Dashboard pages
import CostExplorer from '../Pages/Dashboard/CostExplorer';
import AwsServices from '../Pages/Dashboard/AwsServices/AwsServices';
import OnBoarding from '../Pages/Dashboard/OnBoarding/index';
import UserManagement from '../Pages/Dashboard/UserManagement/UserManagement';
import AddUser from '../Pages/Dashboard/UserManagement/AddUser/AddUser';

const AppRoutes = () => (
  <Routes>
    {/* Public Route */}
    <Route path="/" element={<Login />} />

    {/* Protected routes with layout */}
    <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
      <Route path="/dashboard/CostExplorer" element={<CostExplorer />} />
      <Route path="/dashboard/AwsService" element={<AwsServices />} />

      {/* Only ADMIN can access add/edit users */}
      <Route element={<RoleProtectedRoute allowedRoles={['ADMIN']} />}>
      <Route path="/dashboard/onboarding" element={<OnBoarding />} />
      <Route path="/dashboard/UserManagement/add/:id?" element={<AddUser />} />
      </Route>

      {/* Shared between ADMIN and READ_ONLY */}
      <Route element={<RoleProtectedRoute allowedRoles={['ADMIN', 'READ_ONLY']} />}>
      <Route path="/dashboard/UserManagement" element={<UserManagement />} />
      </Route>
    </Route>

    {/* Fallback route */}
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default AppRoutes;
