// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: Array<'admin' | 'user' | 'guest'>;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { role: userRole } = useAuth();
  const location = useLocation();
  const { lang } = useParams();
  const language = lang || 'en';

  // Since role is initialized synchronously, we can directly check it
  if (!userRole || !allowedRoles.includes(userRole)) {
    return (
      <Navigate to={`/${language}/login`} state={{ from: location }} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
