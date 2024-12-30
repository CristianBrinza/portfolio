import React from 'react';
import { useActivePage } from '../../context/AppActivePageContext';
import AppMenu from '../../components/appmenu/AppMenu.tsx';
import styles from './AppUtils.module.css';
import Icon, { icons } from '../../../components/Icon.tsx';

// Mock implementation of openInAppBrowser
const openInAppBrowser = (url: string) => {
  window.open(url, '_blank'); // Opens the URL in a new tab
};

const menuOptions = [{ title: 'info', icon: 'info', page: 'status' }];

const AppUtils: React.FC = () => {
  const { setActivePage } = useActivePage();

  const handlePageNavigation = (page: string) => {
    if (page.startsWith('http')) {
      openInAppBrowser(page);
    } else {
      setActivePage(page);
    }
  };

  return (
    <div className={styles.app_utils}>
      <div className={styles.app_utils_option_title}>Utilities</div>
      <div className={styles.app_utils_options}>
        {menuOptions.map(({ title, icon, page }) => (
          <div
            key={page}
            className={styles.app_utils_option}
            onClick={() => handlePageNavigation(page)}
          >
            <Icon size="40px" type={icon as keyof typeof icons} />
            {title}
          </div>
        ))}
      </div>
      <AppMenu />
    </div>
  );
};

export default AppUtils;
