// components/AdminLayout.tsx

import React from 'react';
import styles from './AdminLayout.module.css';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import AdminPage from '../../AdminPage';
import AdminSideMenu from '../AdminSideMenu/AdminSideMenu';
import { Trans } from 'react-i18next';

interface BreadcrumbItem {
  label: string | React.ReactNode;
  url?: string;
}

interface AdminProps {
  children: React.ReactNode;
  breadcrumb: BreadcrumbItem[];
}

const AdminLayout: React.FC<AdminProps> = ({ children, breadcrumb }) => {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/dashboard' },
    ...breadcrumb // Spread the breadcrumb array here
  ];

  return (
      <>
        <AdminNavbar />
        <div className="admin_breadcrumb">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <AdminPage minHeight="78vh">
          <div className={styles.adminlayout_content}>
              <AdminSideMenu>ss</AdminSideMenu>

            <div className={styles.adminlayout_child}>{children}</div>
          </div>
        </AdminPage>
      </>
  );
};

export default AdminLayout;
