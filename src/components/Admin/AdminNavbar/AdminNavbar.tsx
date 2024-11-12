// src/components/Admin/AdminNavbar/AdminNavbar.tsx

import React, { useEffect, useState, useRef } from 'react';
import styles from './AdminNavbar.module.css'; // Import the CSS module
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../Button';
import Icon from '../../Icon';
import Popup from '../../Popup/Popup';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import i18n from "../../../i18n.tsx";

const AdminNavbar: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [isListLangPopupVisible, setIsListLangPopupVisible] = useState(false);

  const toggleLangPopup = () => {
    setIsListLangPopupVisible(!isListLangPopupVisible);
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      const pathParts = location.pathname.split('/').filter(Boolean);

      if (['en', 'ro', 'ru'].includes(pathParts[0])) {
        pathParts[0] = lang;
      } else {
        pathParts.unshift(lang);
      }

      const newPath = `/${pathParts.join('/')}/`.replace(/\/+$/, '/');
      navigate(newPath);
      setIsListLangPopupVisible(false);
      localStorage.setItem('i18nextLng', lang);
    });
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark-mode');
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleMenuVisibility = () => setIsMenuVisible(!isMenuVisible);

  const { logout } = useAuth();
  const { lang } = useParams();
  const language = lang || 'en';

  const handleLogoff = () => {
    logout();
    navigate(`/${language}/login`);
  };

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userInitials, setUserInitials] = useState<string>('');
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const profilePopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'ngrok-skip-browser-warning': 'true', // add header here
          },
        });

        if (response.data.image) {
          const imageUrl = `${import.meta.env.VITE_BACKEND}/user/profile-image/${response.data.image}`;
          setProfileImage(imageUrl);
        } else {
          setProfileImage(null);
        }

        // Get user initials
        const { name, surname, username } = response.data;
        const initials = getInitials(name, surname, username);
        setUserInitials(initials);

      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);


  const getInitials = (name: string, surname: string, username: string): string => {
    let initials = '';
    if (name && surname) {
      initials = `${name.charAt(0)}${surname.charAt(0)}`;
    } else if (name) {
      initials = name.charAt(0);
    } else if (surname) {
      initials = surname.charAt(0);
    } else if (username) {
      initials = username.charAt(0);
    }
    return initials.toUpperCase();
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup((prev) => !prev);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
          profilePopupRef.current &&
          !profilePopupRef.current.contains(event.target as Node)
      ) {
        setShowProfilePopup(false);
      }
    };
    if (showProfilePopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfilePopup]);

  return (
      <>
        <nav className={styles.navbar}>
          <Link className={styles.navBrand} to={`/dashboard`}>
            <svg width="163" height="58" viewBox="0 0 163 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="56" height="56" transform="translate(0 1)" fill="#E40523"></rect>
              <path
                  d="M26.8799 19.48C26.8799 19.48 26.3181 19.48 14.7991 19.48C3.28013 19.4799 3.28023 38.52 14.7991 38.52C26.318 38.52 26.8799 38.52 26.8799 38.52"
                  stroke="white" stroke-width="3.92"></path>
              <path
                  d="M29.6799 19.48C29.6799 19.48 30.2417 19.48 41.7607 19.48C53.2797 19.4799 53.2796 38.52 41.7607 38.52C30.2418 38.52 29.6799 38.52 29.6799 38.52"
                  stroke="white" stroke-width="3.92"></path>
              <path d="M32.48 29C32.48 29 33.0418 29.0001 44.5608 29" stroke="white" stroke-width="3.92"></path>
              <path d="M31.8005 22.9595C31.8005 22.9595 31.8005 23.5213 31.8005 35.0403" stroke="white"
                    stroke-width="3.92"></path>
              <path
                  d="M65.0453 36L68.731 26.3476C68.8821 25.9549 69.0734 25.6729 69.3051 25.5017C69.5467 25.3204 69.8287 25.2298 70.151 25.2298C70.4833 25.2298 70.7703 25.3154 71.012 25.4866C71.2537 25.6578 71.445 25.9398 71.586 26.3325L75.3019 36H74.1086L73.0512 33.2206H67.2507L66.1933 36H65.0453ZM67.583 32.2538H72.7189L70.6645 26.7101C70.6041 26.549 70.5336 26.4231 70.4531 26.3325C70.3826 26.2419 70.2869 26.1966 70.1661 26.1966C70.0352 26.1966 69.9345 26.2419 69.864 26.3325C69.8035 26.4231 69.7381 26.549 69.6676 26.7101L67.583 32.2538ZM76.3128 36V25.4262H79.6209C80.7286 25.4262 81.6954 25.6528 82.5212 26.1059C83.3469 26.5591 83.9864 27.1834 84.4396 27.979C84.8927 28.7645 85.1193 29.6708 85.1193 30.698C85.1193 31.7252 84.8927 32.6416 84.4396 33.4472C83.9864 34.2427 83.3469 34.8671 82.5212 35.3203C81.6954 35.7734 80.7286 36 79.6209 36H76.3128ZM77.4004 35.0333H79.636C80.4718 35.0333 81.2221 34.8621 81.8867 34.5197C82.5514 34.1672 83.07 33.6687 83.4426 33.0242C83.8253 32.3697 84.0166 31.5942 84.0166 30.698C84.0166 29.8118 83.8253 29.0465 83.4426 28.402C83.07 27.7575 82.5514 27.264 81.8867 26.9216C81.2221 26.5692 80.4718 26.3929 79.636 26.3929H77.4004V35.0333ZM94.0914 36.1813C93.5778 36.1813 93.1145 36.0655 92.7016 35.8338C92.2888 35.5922 91.9615 35.2598 91.7198 34.8369C91.4882 34.4039 91.3724 33.9104 91.3724 33.3565V27.9035C91.3724 27.5812 91.2968 27.2942 91.1458 27.0425C90.9947 26.7806 90.7933 26.5792 90.5416 26.4382C90.2999 26.2872 90.028 26.2117 89.7259 26.2117C89.4238 26.2117 89.1468 26.2872 88.8951 26.4382C88.6433 26.5792 88.4419 26.7806 88.2909 27.0425C88.1398 27.2942 88.0643 27.5812 88.0643 27.9035V36H86.9767V28.0696C86.9767 27.5158 87.0925 27.0274 87.3241 26.6044C87.5557 26.1814 87.878 25.8491 88.2909 25.6074C88.7037 25.3557 89.1821 25.2298 89.7259 25.2298C90.2596 25.2298 90.7329 25.3557 91.1458 25.6074C91.5587 25.8491 91.8809 26.1814 92.1125 26.6044C92.3542 27.0274 92.4751 27.5158 92.4751 28.0696V33.5227C92.4751 33.845 92.5506 34.137 92.7016 34.3988C92.8527 34.6506 93.0491 34.852 93.2908 35.003C93.5325 35.144 93.7993 35.2145 94.0914 35.2145C94.3834 35.2145 94.6503 35.144 94.8919 35.003C95.1336 34.852 95.325 34.6506 95.4659 34.3988C95.617 34.137 95.6925 33.845 95.6925 33.5227V28.0696C95.6925 27.5158 95.8083 27.0274 96.04 26.6044C96.2716 26.1814 96.5938 25.8491 97.0067 25.6074C97.4297 25.3557 97.908 25.2298 98.4417 25.2298C98.9855 25.2298 99.4588 25.3557 99.8616 25.6074C100.275 25.8491 100.597 26.1814 100.828 26.6044C101.06 27.0274 101.176 27.5158 101.176 28.0696V36H100.088V27.9035C100.088 27.5812 100.013 27.2942 99.8616 27.0425C99.7207 26.7806 99.5243 26.5792 99.2725 26.4382C99.0308 26.2872 98.7539 26.2117 98.4417 26.2117C98.1396 26.2117 97.8576 26.2872 97.5958 26.4382C97.3441 26.5792 97.1427 26.7806 96.9916 27.0425C96.8506 27.2942 96.7801 27.5812 96.7801 27.9035V33.3565C96.7801 33.9104 96.6643 34.4039 96.4327 34.8369C96.2011 35.2598 95.8839 35.5922 95.4811 35.8338C95.0782 36.0655 94.615 36.1813 94.0914 36.1813ZM103.092 36V35.0333H105.192V26.3929H103.092V25.4262H108.379V26.3929H106.279V35.0333H108.379V36H103.092ZM117.413 36.1964C116.89 36.1964 116.421 36.0755 116.009 35.8338C115.596 35.5821 115.273 35.2447 115.042 34.8218C114.81 34.3888 114.694 33.9003 114.694 33.3565V27.9035C114.694 27.5812 114.619 27.2942 114.468 27.0425C114.317 26.7806 114.115 26.5792 113.864 26.4382C113.622 26.2872 113.35 26.2117 113.048 26.2117C112.746 26.2117 112.469 26.2872 112.217 26.4382C111.965 26.5792 111.764 26.7806 111.613 27.0425C111.462 27.2942 111.386 27.5812 111.386 27.9035V36H110.299V28.0696C110.299 27.5158 110.414 27.0274 110.646 26.6044C110.878 26.1814 111.2 25.8491 111.613 25.6074C112.026 25.3557 112.504 25.2298 113.048 25.2298C113.582 25.2298 114.055 25.3557 114.468 25.6074C114.881 25.8491 115.203 26.1814 115.435 26.6044C115.676 27.0274 115.797 27.5158 115.797 28.0696V33.5227C115.797 33.855 115.873 34.1471 116.024 34.3988C116.175 34.6506 116.371 34.852 116.613 35.003C116.854 35.144 117.121 35.2145 117.413 35.2145C117.705 35.2145 117.972 35.144 118.214 35.003C118.456 34.852 118.647 34.6506 118.788 34.3988C118.929 34.1471 118.999 33.855 118.999 33.5227V25.4262H120.087V33.3565C120.087 33.9003 119.976 34.3888 119.755 34.8218C119.533 35.2447 119.221 35.5821 118.818 35.8338C118.415 36.0755 117.947 36.1964 117.413 36.1964Z"
                  fill="#1D1D1F"></path>
            </svg>
          </Link>

          <button className={styles.menuIcon} onClick={toggleMenuVisibility}>
            <Icon type="menu" size="30px" color="var(--theme_primary_color_black)"/>
          </button>
          <div className={`${styles.navItems} ${isMenuVisible ? styles.visible : ''}`}>
            <Link className={styles.navbar_on_hover_text} to="/admin">
              Admin
            </Link>
            <Link
                className={styles.navbar_on_hover_text}
                to="/dashboard/portfolio-manager"
            >
              Portfolio
            </Link>
            <Link className={styles.navbar_on_hover_text} to="/dashboard/storage">
              Storage
            </Link>

            <a
                className={styles.navbar_on_hover}
                onClick={toggleLangPopup}
                style={{cursor: 'pointer'}}
            >
              <span className={styles.navbarShowOnMobile}> Language:&nbsp;</span>
              {i18n.language === 'en' ? (
                  <Icon type="en" size="28px"/>
              ) : i18n.language === 'ro' ? (
                  <Icon type="ro" size="28px"/>
              ) : (
                  <Icon type="ru" size="28px"/>
              )}
            </a>

            <a
                id="navbar_isDarkMode"
                className={styles.navbar_on_hover}
                onClick={toggleTheme}
            >
              <span className={styles.navbarShowOnMobile}> Mode:&nbsp;</span>
              <Icon type={isDarkMode ? 'dark_mode' : 'light_mode'}/>
            </a>

            <div className={styles.profileContainer}>
              {profileImage ? (
                  <img
                      src={profileImage}
                      alt="Profile"
                      className={styles.profileImage}
                      onClick={toggleProfilePopup}
                  />
              ) : (
                  <div
                      className={styles.initialsCircle}
                      onClick={toggleProfilePopup}
                  >
                    {userInitials}
                  </div>
              )}

              {showProfilePopup && (
                  <div className={styles.profilePopup} ref={profilePopupRef}>
                    <Button
                        color="var(--theme_primary_color_black)"
                        bgcolor="var(--theme_primary_color_white)"
                        border="var(--theme_primary_color_white)"
                        hover_bgcolor="var(--theme_primary_color_dark_gray)"
                        hover_color="var(--theme_primary_color_black)"
                        onClick={() => navigate('/dashboard/profile')}>
                      Edit Profile
                    </Button>
                    <Button
                        color="var(--theme_primary_color_black)"
                        bgcolor="var(--theme_primary_color_white)"
                        border="var(--theme_primary_color_white)"
                        hover_bgcolor="var(--theme_primary_color_dark_gray)"
                        hover_color="var(--theme_primary_color_black)"
                        onClick={handleLogoff}>Log Off</Button>
                  </div>
              )}
            </div>
          </div>
        </nav>
        {isListLangPopupVisible && (
            <Popup
                id="languagePopup"
                isVisible={isListLangPopupVisible}
                onClose={toggleLangPopup}
            >
              <div className={styles.langPopupContent}>
                <Button onClick={() => handleChangeLanguage('en')}>English</Button>
                <Button onClick={() => handleChangeLanguage('ro')}>Romanian</Button>
                <Button onClick={() => handleChangeLanguage('ru')}>Russian</Button>
              </div>
            </Popup>
        )}
      </>
  );
};

export default AdminNavbar;
