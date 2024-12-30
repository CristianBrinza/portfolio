import React from 'react';
import { useActivePage } from '../../context/AppActivePageContext';
import AppMenu from '../../components/appmenu/AppMenu.tsx';
import styles from './AppSecurity.module.css';
import Icon, { icons } from '../../../components/Icon.tsx';

// Mock implementation of openInAppBrowser
const openInAppBrowser = (url: string) => {
  window.open(url, '_blank'); // Opens the URL in a new tab
};

const menuOptions = [
  { title: 'Password', icon: 'lock', page: 'edit_password' },
  {
    title: 'Conditions',
    icon: 'legal',
    page: 'https://cristianbrinza.com/legal',
  },
];

const AppSecurity: React.FC = () => {
  const { setActivePage } = useActivePage();

  const handlePageNavigation = (page: string) => {
    if (page.startsWith('http')) {
      openInAppBrowser(page);
    } else {
      setActivePage(page);
    }
  };

  return (
    <div className={styles.app_security}>
      <div className={styles.app_security_option_title}>
        <span>
          <span>Security</span>
        </span>
      </div>
      {menuOptions.map(({ title, icon, page }) => (
        <div
          key={page}
          className={styles.app_security_option}
          onClick={() => handlePageNavigation(page)}
        >
          <span className={styles.app_security_option_text}>
            <Icon type={icon as keyof typeof icons} />
            {title}
          </span>
          <Icon type="arrow" />
        </div>
      ))}
      <AppMenu />
    </div>
  );
};

export default AppSecurity;
