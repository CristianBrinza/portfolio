// src/context/AuthContext.tsx

import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  role: 'admin' | 'user' | 'guest' | null;
  setRole: (role: 'admin' | 'user' | 'guest' | null) => void;
  login: (token: string, role: 'admin' | 'user' | 'guest') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<'admin' | 'user' | 'guest' | null>(() => {
    // Initialize role from localStorage synchronously
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role') as
      | 'admin'
      | 'user'
      | 'guest'
      | null;
    if (savedToken && savedRole) {
      return savedRole;
    } else {
      return null;
    }
  });

  const login = (token: string, userRole: 'admin' | 'user' | 'guest') => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
