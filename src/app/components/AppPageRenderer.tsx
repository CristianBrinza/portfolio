import React from 'react';
import { useActivePage } from '../context/AppActivePageContext';
import { useAuth } from '../context/AppAuthContext';

import AppHome from '../ui/home/AppHome';
import AppLogin from '../ui/login/AppLogin';
import AppProfile from '../ui/profile/AppProfile';
import AppMore from '../ui/more/AppMore.tsx';
import AppUtils from '../ui/utils/AppUtils.tsx';
import AppSettings from '../ui/settings/AppSettings.tsx';
import AppStatus from '../ui/status/AppStatus.tsx';
import AppSearch from '../ui/search/AppSearch.tsx';
import AppEditProfile from '../ui/edit_profile/AppEditProfile.tsx';
import AppSecurity from '../ui/security/AppSecurity.tsx';
import AppEditPassword from '../ui/edit_password/AppEditPassword.tsx';

const pages: Record<string, React.FC> = {
  home: AppHome,
  login: AppLogin,
  profile: AppProfile,
  more: AppMore,
  utils: AppUtils,
  settings: AppSettings,
  search: AppSearch,
  status: AppStatus,
  edit_profile: AppEditProfile,
  security: AppSecurity,
  edit_password: AppEditPassword,
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
