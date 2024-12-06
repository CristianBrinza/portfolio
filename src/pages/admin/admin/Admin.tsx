// src/pages/admin/dashboard/Storage.tsx

import React from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';

const Dashboard: React.FC = () => {
  const breadcrumb = [{ label: 'Admin' }];

  const menu = [
    {
      btn: 'Edit Profile',
      url: '/dashboard/profile',
      type: 'button',
      icon: 'profile',
    },
  ];

  return (
    <div>
      <AdminLayout menu_items={menu} breadcrumb={breadcrumb}>
        <p>Welcome to the ADMIN!</p>
      </AdminLayout>
    </div>
  );
};

export default Dashboard;
