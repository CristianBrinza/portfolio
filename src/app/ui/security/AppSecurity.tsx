import React from 'react';
import AppMenu from '../../components/appmenu/AppMenu.tsx';
import styles from './AppSecurity.module.css';

const AppSecurity: React.FC = () => {
  return (
    <div className={styles.app_more}>
      <div className={styles.app_more_option_title}>
        <span>
          <span>Security</span>
        </span>
      </div>

      <AppMenu />
    </div>
  );
};

export default AppSecurity;
