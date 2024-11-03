import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { Trans } from 'react-i18next';
import Footer from '../../../components/Footer/Footer';
import Page from '../../../components/Page';
import Notification from '../../../components/Notification/Notification';
import './login.css';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';

export default function Login() {
  console.log('Login component mounted'); // Log when the component is first rendered

  const [pageHeight, setPageHeight] = useState('calc(100vh - 160px)');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { lang } = useParams();

  const language = lang || 'en'; // Default to 'en' if lang is undefined
  console.log('Language:', language);

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      setPageHeight(`calc(${vh * 100}px - 160px)`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    console.log('Resize event listener added');

    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('Resize event listener removed');
    };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const loginParam = queryParams.get('login');
    const pwdParam = queryParams.get('password');

    console.log('URL parameters:', { loginParam, pwdParam });

    if (loginParam && pwdParam) {
      setUsername(loginParam);
      setPassword(pwdParam);
      console.log('Username and password set from URL parameters');
      handleLogin(loginParam, pwdParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (username: string, password: string) => {
    console.log('handleLogin called with:', username, password);
    try {
      const { data } = await api.post('/auth/login', { username, password });
      console.log('API response data:', data);

      if (data.token && data.role) {
        console.log('Calling login function with token and role:', data.token, data.role);
        login(data.token, data.role);

        // Redirect to /dashboard regardless of role
        const redirectPath = `/${language}/dashboard`;
        console.log('Navigating to redirectPath:', redirectPath);
        navigate(redirectPath);
      } else {
        console.log('Login failed, invalid token or role in response data');
        addNotification('Login failed. Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      addNotification('Login failed. Please check your credentials.');
    }
  };
  const addNotification = (message: string) => {
    console.log('Adding notification:', message);
    setNotifications((prev) => [...prev, message]);
    setShowNotification(true);

    setTimeout(() => {
      console.log('Removing notification:', message);
      setNotifications((prev) => prev.filter((msg) => msg !== message));
      setShowNotification(false);
    }, 10000);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted with username and password:', { username, password });
    handleLogin(username, password);
  };

  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: `/${language}/` },
    { label: 'Login' },
  ];

  console.log('Rendering login form with breadcrumb items:', breadcrumbItems);

  return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <Page className="login_page" gap="0px" style={{ height: pageHeight }}>
          <div className="logo_container">
            {/* SVG Logo */}
          </div>
          <div className="login_container">
            <form className="login_form" onSubmit={handleFormSubmit}>
              <label className="login_form_label">
                <p className="label">Login</p>
              </label>
              <input
                  type="text"
                  className="login_input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    console.log('Username changed:', e.target.value);
                  }}
                  required
                  autoComplete="username"
              />
              <label className="login_form_label">
                <p className="label">Password</p>
              </label>
              <input
                  type="password"
                  className="login_input"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    console.log('Password changed:', e.target.value);
                  }}
                  required
                  autoComplete="current-password"
              />
              <Button
                  color="var(--theme_primary_color_white)"
                  bgcolor="var(--theme_primary_color_black)"
                  border="var(--theme_primary_color_black)"
                  id="login_button"
                  type="submit"
              >
                Sign in
              </Button>
            </form>

            {showNotification &&
                notifications.map((message, index) => (
                    <Notification key={index} type="warning">
                      {message}
                    </Notification>
                ))}
          </div>
        </Page>
        <Footer />
      </>
  );
}
