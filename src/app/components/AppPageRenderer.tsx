import React from 'react';
import { useActivePage } from '../context/AppActivePageContext';
import { useAuth } from '../context/AppAuthContext';

import AppHome from '../ui/home/AppHome';
import AppLogin from '../ui/login/AppLogin';
import AppProfile from '../ui/profile/AppProfile';

const pages: Record<string, React.FC> = {
  home: AppHome,
  login: AppLogin,
  profile: AppProfile,
};

const AppPageRenderer: React.FC = () => {
  const { activePage } = useActivePage();
  const { isAuthenticated } = useAuth();

  // If not authenticated, always show the login page
  if (!isAuthenticated) {
    return <AppLogin />;
  }

  const ActiveComponent = pages[activePage] || AppHome;
  return <ActiveComponent />;
};

export default AppPageRenderer;
