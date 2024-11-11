// src/pages/admin/dashboard/Storage.tsx

import React from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';

const Dashboard: React.FC = () => {
    const breadcrumb = [
        { label: 'Dashboard' }
    ];

    return (
        <div>
            <AdminLayout breadcrumb={breadcrumb}>
                <p>Welcome to the Dashboard!</p>
            </AdminLayout>
        </div>
    );
};

export default Dashboard;
