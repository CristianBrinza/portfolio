import React from 'react';
import { useActivePage } from '../../context/AppActivePageContext';
import AppMenu from '../../components/appmenu/AppMenu.tsx';
import styles from './AppMore.module.css';
import Icon, { icons } from '../../../components/Icon.tsx';

// Mock implementation of openInAppBrowser
const openInAppBrowser = (url: string) => {
  window.open(url, '_blank'); // Opens the URL in a new tab
};

const menuOptions = [
  {
    title: 'Web utils',
    icon: 'utils',
    page: 'https://cristianbrinza.com/en/utilities',
  },
  { title: 'Settings', icon: 'settings', page: 'settings' },
];

const AppMore: React.FC = () => {
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
      <div className={styles.app_more_option_title}>More</div>
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
      <AppMenu />
    </div>
  );
};

export default AppMore;
