// src/pages/admin/addfiles/AdminAddFilesPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import Button from '../../../components/Button';
import Notification from '../../../components/Notification/Notification';
import Icon from '../../../components/Icon';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout.tsx';
import { storage_menu as AdminMenu } from '../menues.ts';

interface CodeItem {
  code: string;
  createdAt: string;
}

const AdminAddFilesPage: React.FC = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const { lang } = useParams();
  const language = lang || 'en';

  const [codes, setCodes] = useState<CodeItem[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'error' | 'success';
  }>({ message: '', type: 'success' });

  useEffect(() => {
    if (role !== 'admin') {
      navigate(`/${language}/login`);
    } else {
      fetchCodes();
    }
  }, [role]);

  const fetchCodes = async () => {
    try {
      const response = await api.get('/add-files/codes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCodes(response.data);
    } catch (error) {
      setNotification({ message: 'Error fetching codes', type: 'error' });
    }
  };

  const handleGenerateCode = async () => {
    try {
      const response = await api.post(
        '/add-files/generate',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const { code } = response.data;
      setNotification({ message: `Code generated: ${code}`, type: 'success' });
      fetchCodes();
    } catch (error) {
      setNotification({ message: 'Error generating code', type: 'error' });
    }
  };

  const handleDeleteCode = async (code: string) => {
    if (!window.confirm(`Delete code ${code}?`)) return;
    try {
      await api.delete(`/add-files/${code}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotification({ message: `Code ${code} deleted.`, type: 'success' });
      fetchCodes();
    } catch (error) {
      setNotification({ message: 'Error deleting code', type: 'error' });
    }
  };
  const breadcrumbItems = [
    { label: 'Dashboard', url: `/${language}/dashboard` },
    { label: 'Share Manager' },
  ];
  const menu = AdminMenu.map(item =>
    item.url === '/dashboard/add-files'
      ? { ...item, type: 'button_active' }
      : item
  );

  return (
    <AdminLayout menu_items={menu} breadcrumb={breadcrumbItems}>
      <div>
        {notification.message && (
          <Notification
            type={notification.type}
            onClose={() => setNotification({ message: '', type: 'success' })}
          >
            {notification.message}
          </Notification>
        )}
        <Button onClick={handleGenerateCode} color="#fff" bgcolor="#317ce6">
          Generate New Code
        </Button>

        <div style={{ marginTop: '20px' }}>
          <h3>Existing Codes</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {codes.map(item => (
              <li
                key={item.code}
                style={{
                  marginBottom: '10px',
                  display: ' flex',
                  alignItems: 'center',
                }}
              >
                <strong>{item.code}</strong> (created{' '}
                {new Date(item.createdAt).toLocaleString()})
                <div
                  style={{
                    display: 'flex',
                    marginLeft: '10px',
                    alignItems: 'center',
                    gap: '1px',
                  }}
                >
                  <Button
                    onClick={() =>
                      void window.open(
                        `${window.location.origin}/${language}/add-files/${item.code}`,
                        '_blank'
                      )
                    }
                    color="var(--theme_primary_color_black)"
                    bgcolor="var(--theme_primary_color_dark_gray)"
                  >
                    Visit Link
                  </Button>
                  <Button
                    onClick={() => handleDeleteCode(item.code)}
                    color="var(--theme_primary_color_black)"
                    bgcolor="var(--theme_primary_color_dark_gray)"
                  >
                    <Icon type="trash" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddFilesPage;
