import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JobDetailsPage from './pages/JobDetailsPage';

import MyApplications from './pages/MyApplications';

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateJobPage from "./pages/admin/CreateJobPage";
import EditJobPage from "./pages/admin/EditJobPage";
import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";

import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* 🟢 Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🟢 User Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="jobs/:id" element={<JobDetailsPage />} />
            <Route path="my-applications" element={<MyApplications />} />
          </Route>

          {/* 🔵 Admin Routes (ROLE BASED) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create-job"
            element={
              <ProtectedRoute role="admin">
                <CreateJobPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-job/:id"
            element={
              <ProtectedRoute role="admin">
                <EditJobPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute role="admin">
                <AdminApplicationsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="admin">
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />

          {/* 🔴 Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;