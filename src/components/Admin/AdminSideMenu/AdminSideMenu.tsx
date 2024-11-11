// components/AdminSideMenu.tsx
import React from 'react';
import styles from './AdminSideMenu.module.css';

interface AdminProps {
    children: React.ReactNode;
}

const AdminSideMenu: React.FC<AdminProps> = ({
                                                 children,

}) => {



  return (
      <div  className={styles.AdminSideMenu}>
          {children}
      </div>
  );
};

export default AdminSideMenu;
