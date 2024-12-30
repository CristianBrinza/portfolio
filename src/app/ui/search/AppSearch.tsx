import React from 'react';
import AppMenu from '../../components/appmenu/AppMenu.tsx';
import styles from './AppSearch.module.css';
import Icon from '../../../components/Icon.tsx';

const AppSearch: React.FC = () => {
  return (
    <div className={styles.app_search}>
      <div className={styles.app_search_option_title}>Search</div>
      <div className={styles.app_search_block}>
        <div className={styles.input_wrapper}>
          <Icon
            type="search"
            color="var(--theme_primary_color_black)"
            className={styles.input_icon}
          />
          <input
            className={styles.app_search_input}
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <AppMenu />
    </div>
  );
};

export default AppSearch;
