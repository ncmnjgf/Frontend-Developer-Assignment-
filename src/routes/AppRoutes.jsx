import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Lazy-loaded pages for code splitting
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Employees = lazy(() => import('@/pages/Employees'));
const AddEmployee = lazy(() => import('@/pages/AddEmployee'));
const EditEmployee = lazy(() => import('@/pages/EditEmployee'));
const EmployeeDetailsPage = lazy(() => import('@/pages/EmployeeDetailsPage'));
const SearchEmployee = lazy(() => import('@/pages/SearchEmployee'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const AppRoutes = () => (
  <AdminLayout>
    <Suspense fallback={<LoadingSpinner message="Loading page…" />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
        <Route path="/employees/:id/edit" element={<EditEmployee />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/search" element={<SearchEmployee />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </AdminLayout>
);

export default AppRoutes;
