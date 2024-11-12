// src/pages/admin/profile/ProfilePage.tsx

import React, { useState } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import api from '../../../utils/api';
import Button from '../../../components/Button';
import Notification from '../../../components/Notification/Notification';
import styles from './ProfilePage.module.css';
import Title from "../../../components/Text/Title/Title.tsx";

const PasswordPage: React.FC = () => {

    const menu = [
        { btn: 'Edit Profile', url:'/dashboard/profile', type:'button', icon:"profile"},
        { btn: 'Change Password', type:'button_active', icon:"password"}
    ];

    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    } | null>(null);

    // State for password change
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(
                '/user/password',
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );
            setNotification({ message: 'Password updated successfully', type: 'success' });
            setCurrentPassword('');
            setNewPassword('');
        } catch (error: any) {
            console.error('Error updating password:', error);
            if (error.response && error.response.data) {
                setNotification({ message: error.response.data.message, type: 'error' });
            } else {
                setNotification({ message: 'Error updating password', type: 'error' });
            }
        }
    };



    const breadcrumbItems = [{ label: 'Dashboard', url: '/dashboard' },
        { label: 'Profile', url: '/dashboard/profile' }, { label: 'Password' }];

    return (
        <AdminLayout menu_items={menu} breadcrumb={breadcrumbItems}>
            {notification && (
                <Notification
                    type={notification.type}
                    onClose={() => setNotification(null)}
                >
                    {notification.message}
                </Notification>
            )}
<Title className={styles.profile_password_edit_title}>Change Password</Title>
                <form onSubmit={handlePasswordSubmit}>
                    <div className={styles.form_group}>
                        <label>Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit"
                            color="#fff"
                            bgcolor="#317ce6"
                            border="#317ce6"
                            hover_bgcolor="#1967D2"
                            hover_color="#fff"
                    >Change Password</Button>
                </form>

        </AdminLayout>
    );
};


export default PasswordPage;
