// src/pages/admin/dashboard/Storage.tsx

import React from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';

const Dashboard: React.FC = () => {
    const breadcrumb = [
        { label: 'Dashboard' }
    ];

    const menu = [
        { btn: 'Portfolio', url: '/dashboard/portfolio-manager', type: 'button', icon: 'menu' },
        { btn: 'Storage', url: '/dashboard/storage', type: 'button', icon: 'menu' }
    ];

    return (
        <div>
            <AdminLayout menu_items={menu} breadcrumb={breadcrumb}>
                <p>Welcome to the Dashboard!</p>
            </AdminLayout>
        </div>
    );
};

export default Dashboard;
