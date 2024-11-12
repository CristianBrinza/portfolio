import React, { ReactNode } from 'react';
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

interface AdminSideMenuItem {
    btn: ReactNode;
    url?: string;
}

interface AdminProps {
    children: React.ReactNode;
    breadcrumb: BreadcrumbItem[];
    menu_items?: AdminSideMenuItem[]; // Make menu_items optional
}

const AdminLayout: React.FC<AdminProps> = ({ children, breadcrumb, menu_items = [] }) => {
    const breadcrumbItems = [
        { label: <Trans>navigation.home</Trans>, url: '/dashboard' },
        ...breadcrumb
    ];

    return (
        <>
            <AdminNavbar />
            <div className="admin_breadcrumb">
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <AdminPage minHeight="78vh">
                <div className={styles.adminlayout_content}>
                    <AdminSideMenu items={menu_items} />
                    <div className={styles.adminlayout_child}>{children}</div>
                </div>
            </AdminPage>
        </>
    );
};

export default AdminLayout;
