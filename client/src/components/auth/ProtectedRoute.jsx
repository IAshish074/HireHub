import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, role }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">

        {/* Loader */}
        <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500 animate-spin mb-4" />

        {/* Optional Text */}
        <p className="text-gray-400 text-sm sm:text-base text-center">
          Checking authentication...
        </p>

      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role validation
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <div className="w-full min-h-screen">{children}</div>;
};

export default ProtectedRoute;