import React, { useState } from 'react';
import AppMenu from '../../components/appmenu/AppMenu.tsx';
import styles from './AppEditPassword.module.css';
import TextField from '../../components/textfield/TextField.tsx';
import Notification from '../../../components/Notification/Notification.tsx';
import Button from '../../../components/Button.tsx';
import { useAuth } from '../../context/AppAuthContext.tsx';

const AppEditPassword: React.FC = () => {
  const { logout, token } = useAuth(); // token is now available
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token) {
        throw new Error('User not authenticated');
      }

      // Validation: Check if the new password is the same as the current password
      if (currentPassword === newPassword) {
        setNotification({
          message: 'New password must be different from the current password',
          type: 'warning',
        });
        return; // Stop further execution
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/user/password`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true', // only if needed
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setNotification({
            message: 'Session expired. Logging out...',
            type: 'error',
          });
          logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating password');
      }

      setNotification({
        message: 'Password updated successfully',
        type: 'success',
      });
      setCurrentPassword('');
      setNewPassword('');
    } catch (error: any) {
      console.error('Error updating password:', error);
      setNotification({
        message: error.message || 'Error updating password',
        type: 'error',
      });
    }
  };

  return (
    <div className={styles.app_edit_password}>
      <div className={styles.app_edit_password_option_title}>
        <span>
          <span style={{ fontWeight: '300' }}>Edit</span> <br />
          <span>Password</span>
        </span>
      </div>
      <form
        onSubmit={handlePasswordSubmit}
        className={styles.app_edit_password_form}
      >
        <TextField
          label="Old Password"
          type="password"
          name="currentPassword"
          value={currentPassword}
          icon_color="var(--theme_primary_color_black)"
          onChange={e => setCurrentPassword(e.target.value)}
          required
        />

        <TextField
          label="New Password"
          type="password"
          name="newPassword"
          value={newPassword}
          icon_color="var(--theme_primary_color_black)"
          onChange={e => setNewPassword(e.target.value)}
          required
        />

        <Button
          color="#fff"
          bgcolor="#317ce6"
          border="#317ce6"
          hover_bgcolor="#1967D2"
          hover_color="#fff"
          type="submit"
        >
          Change Password
        </Button>
      </form>
      {notification && (
        <Notification
          type={notification.type}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}
      <AppMenu />
    </div>
  );
};

export default AppEditPassword;
