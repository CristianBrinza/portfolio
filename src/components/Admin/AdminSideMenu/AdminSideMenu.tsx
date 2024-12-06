import React, { ReactNode } from 'react';
import styles from './AdminSideMenu.module.css';
import { Link } from 'react-router-dom';
import Icon, { icons } from '../../Icon.tsx';

interface AdminItem {
  btn: ReactNode;
  url?: string;
  type?: string;
  icon?: keyof typeof icons;
}

interface AdminProps {
  items?: AdminItem[];
}

// Use const assertion to enforce literal types for icon keys
const iconTypeMap = Object.keys(icons).reduce(
  (acc, key) => {
    acc[key as keyof typeof icons] = key as keyof typeof icons;
    return acc;
  },
  {} as Record<keyof typeof icons, keyof typeof icons>
);

const AdminSideMenu: React.FC<AdminProps> = ({ items = [] }) => {
  return (
    <div className={styles.AdminSideMenu}>
      {items.length > 0 ? (
        items.map((item: AdminItem, index: number) =>
          item.type === 'button' && item.url ? (
            <Link
              className={styles.AdminSideMenu_btn}
              key={index}
              to={item.url}
            >
              {item.icon ? (
                <Icon type={iconTypeMap[item.icon]} />
              ) : (
                <Icon type="empty" />
              )}
              {item.btn}
            </Link>
          ) : item.type === 'button_active' ? (
            <span className={styles.AdminSideMenu_btn_active} key={index}>
              {item.icon ? (
                <Icon type={iconTypeMap[item.icon]} />
              ) : (
                <Icon type="empty" />
              )}
              {item.btn}
            </span>
          ) : (
            <span key={index}>{item.btn}</span>
          )
        )
      ) : (
        <span></span> // Placeholder for empty menu
      )}
    </div>
  );
};

export default AdminSideMenu;
