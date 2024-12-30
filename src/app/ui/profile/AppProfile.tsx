import React from 'react';
import { useActivePage } from '../../context/AppActivePageContext';
import AppMenu from '../../components/appmenu/AppMenu.tsx';
import styles from './AppProfile.module.css';
import Icon, { icons } from '../../../components/Icon.tsx';
import { useAuth } from '../../context/AppAuthContext.tsx';

// Mock implementation of openInAppBrowser
const openInAppBrowser = (url: string) => {
  window.open(url, '_blank'); // Opens the URL in a new tab
};

const menuOptions = [
  { title: 'Profile', icon: 'profile', page: 'edit_profile' },
  { title: 'Security', icon: 'lock', page: 'security' },
];

const AppProfile: React.FC = () => {
  const { logout } = useAuth();
  const { setActivePage } = useActivePage();

  const handlePageNavigation = (page: string) => {
    if (page.startsWith('http')) {
      openInAppBrowser(page);
    } else {
      setActivePage(page);
    }
  };

  return (
    <div className={styles.app_more}>
      <div className={styles.app_more_option_title}>
        <span>
          {' '}
          <span style={{ fontWeight: '300' }}>My</span> <br />
          <span>Profile</span>
        </span>
      </div>
      {menuOptions.map(({ title, icon, page }) => (
        <div
          key={page}
          className={styles.app_more_option}
          onClick={() => handlePageNavigation(page)}
        >
          <span className={styles.app_more_option_text}>
            <Icon type={icon as keyof typeof icons} />
            {title}
          </span>
          <Icon type="arrow" />
        </div>
      ))}
      <div className={styles.app_more_option}>
        <span className={styles.app_more_option_text} onClick={() => logout()}>
          <Icon type="logout" />
          Log out
        </span>
        <Icon type="arrow" />
      </div>
      <AppMenu />
    </div>
  );
};

export default AppProfile;
