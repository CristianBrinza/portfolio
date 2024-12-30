import React, { useEffect, useState } from 'react';
import AppMenu from '../../components/appmenu/AppMenu.tsx';
import styles from './AppEditProfile.module.css';
import TextField from '../../components/textfield/TextField.tsx';
import Notification from '../../../components/Notification/Notification.tsx';
import Button from '../../../components/Button.tsx';
import { useAuth } from '../../context/AppAuthContext.tsx';

const AppEditProfile: React.FC = () => {
  const { token, logout } = useAuth();

  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  // User fields
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [image, setImage] = useState(''); // filename from backend

  // For uploading a new profile image
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  // Fetch the user profile on mount
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/user/profile`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true', // only if needed
          },
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
        throw new Error('Error fetching profile');
      }

      // Parse the JSON response
      const data = await response.json();
      setUsername(data.username ?? '');
      setName(data.name ?? '');
      setSurname(data.surname ?? '');
      setImage(data.image ?? '');

      // If there's an existing image, show its URL
      if (data.image) {
        setProfileImageUrl(
          `${import.meta.env.VITE_BACKEND}/user/profile-image/${data.image}`
        );
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      setNotification({
        message: error.message || 'Error fetching profile',
        type: 'error',
      });
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token) {
        throw new Error('User not authenticated');
      }

      // First, if a new image is selected, upload it
      let uploadedImageFilename = image; // keep the old one if no new file
      if (selectedFile) {
        const formData = new FormData();
        formData.append('profileImage', selectedFile);

        const uploadResponse = await fetch(
          `${import.meta.env.VITE_BACKEND}/user/profile-image`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'true', // only if needed
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          if (uploadResponse.status === 401) {
            setNotification({
              message: 'Session expired. Logging out...',
              type: 'error',
            });
            logout();
            return;
          }
          throw new Error('Error uploading profile image');
        }

        const uploadData = await uploadResponse.json();
        uploadedImageFilename = uploadData.filename;
      }

      // Next, update name/surname (and set new image filename if uploaded)
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/user/profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true', // only if needed
          },
          body: JSON.stringify({
            name,
            surname,
            image: uploadedImageFilename,
            // username is NOT sent (not editable)
          }),
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
        throw new Error(errorData.message || 'Error updating profile');
      }

      setNotification({
        message: 'Profile updated successfully',
        type: 'success',
      });
      setSelectedFile(null);
      // Re-fetch profile to reflect changes
      fetchProfile();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setNotification({
        message: error.message || 'Error updating profile',
        type: 'error',
      });
    }
  };

  // Handle local file selection for preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Create a local preview
      const previewUrl = URL.createObjectURL(file);
      setProfileImageUrl(previewUrl);
    }
  };

  return (
    <div className={styles.app_edit_profile}>
      <div className={styles.app_edit_profile_option_title}>
        <span>
          <span style={{ fontWeight: '300' }}>Edit</span> <br />
          <span>Profile</span>
        </span>
      </div>

      <form
        onSubmit={handleProfileSubmit}
        className={styles.app_edit_profile_form}
      >
        {/* Username is shown but cannot be changed */}
        <TextField
          label="Username"
          type="text"
          name="username"
          value={username}
          onChange={() => {}}
          disabled
        />

        <TextField
          label="Name"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <TextField
          label="Surname"
          type="text"
          name="surname"
          value={surname}
          onChange={e => setSurname(e.target.value)}
          required
        />

        <div className={styles.form_group}>
          <label className={styles.form_label}>Profile Image</label>
          {profileImageUrl && (
            <img
              src={profileImageUrl}
              alt="Profile Preview"
              className={styles.profile_image_preview}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.file_input}
          />
        </div>

        <Button
          color="#fff"
          bgcolor="#317ce6"
          border="#317ce6"
          hover_bgcolor="#1967D2"
          hover_color="#fff"
          type="submit"
        >
          Save Changes
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

export default AppEditProfile;
