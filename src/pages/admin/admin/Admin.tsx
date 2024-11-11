// src/pages/admin/dashboard/Storage.tsx

import React from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';

const Dashboard: React.FC = () => {
  const breadcrumb = [
    { label: 'Admin' }
  ];

  return (
      <div>
        <AdminLayout breadcrumb={breadcrumb}>
          <p>Welcome to the ADMIN!</p>
        </AdminLayout>
      </div>
  );
};

export default Dashboard;
