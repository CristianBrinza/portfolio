import React from 'react';
import styles from './AppMenu.module.css';
import Icon, { icons } from '../../../components/Icon.tsx';
import { useActivePage } from '../../context/AppActivePageContext.tsx';

// Define the menu options
const menuOptions = [
  { title: 'Home', icon: 'home', page: 'home' },
  { title: 'Search', icon: 'search', page: 'search' },
  { title: 'Utils', icon: 'utils', page: 'utils' },
  { title: 'More', icon: 'more', page: 'more' },
  { title: 'Profile', icon: 'profile', page: 'profile' },
];

const AppMenu: React.FC = () => {
  const { activePage, setActivePage } = useActivePage();

  return (
    <div className={styles.app_menu}>
      {menuOptions.map(({ title, icon, page }) => (
        <div
          key={page}
          className={styles.app_menu_option}
          onClick={() => setActivePage(page)}
          style={{ fontWeight: activePage === page ? 'bold' : 'normal' }}
        >
          <Icon
            type={icon as keyof typeof icons}
            color={
              activePage === page
                ? ' var(--theme_primary_color_red)'
                : ' var(--theme_primary_color_black)'
            }
          />
          {title}
        </div>
      ))}
    </div>
  );
};

export default AppMenu;
