import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Footer from '../../../components/Footer/Footer.tsx';
import Page from '../../../components/Page.tsx';
import Notification from '../../../components/Notification/Notification.tsx';
import './login.css';
import Button from '../../../components/Button.tsx';

export default function Login() {
  const [pageHeight, setPageHeight] = useState('calc(100vh - 160px)');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]); // To handle multiple notifications
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      setPageHeight(`calc(${vh * 100}px - 160px)`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Extract query parameters
    const queryParams = new URLSearchParams(location.search);
    const login = queryParams.get('login');
    const pwd = queryParams.get('password');

    if (login && pwd) {
      // Pre-fill the form with the username and password from the query parameters
      setUsername(login);
      setPassword(pwd);

      // Attempt automatic login after the credentials are prefilled
      handleLogin(login, pwd);
    }
  }, [location.search]);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('https://cristianbrinza.com/atemptlogon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // If the response is not OK, add a notification
        addNotification('Login failed. Please check your credentials.');
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Simulate a successful login (you can modify this to fit your actual flow)
        navigate('/admin');
      } else {
        addNotification('Login failed. Invalid username or password.');
      }
    } catch (error) {
      // If an error occurs or the server returns nothing
      addNotification('Login failed. Server did not respond or returned an error.');
    }
  };

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setShowNotification(true); // Show notification
    setTimeout(() => {
      setShowNotification(false); // Hide notification after 10 seconds
    }, 10000);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: 'Login' },
  ];

  return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <Page className="login_page" style={{ height: pageHeight }}>
          <div className="login_container">
            <div className="logo_container">
              <svg
                  width="80"
                  height="80"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="56" height="56" fill="#E40523" />
                <path
                    d="M26.8802 18.48C26.8802 18.48 26.3183 18.48 14.7994 18.48C3.28037 18.4799 3.28047 37.52 14.7994 37.52C26.3182 37.52 26.8802 37.52 26.8802 37.52"
                    stroke="white"
                    strokeWidth="3.92"
                />
                <path
                    d="M29.6804 18.48C29.6804 18.48 30.2422 18.4801 41.7612 18.48C53.2802 18.48 53.2801 37.52 41.7612 37.52C30.2423 37.52 29.6804 37.52 29.6804 37.52"
                    stroke="white"
                    strokeWidth="3.92"
                />
                <path
                    d="M32.4807 28.0001C32.4807 28.0001 33.0425 28.0001 44.5615 28.0001"
                    stroke="white"
                    strokeWidth="3.92"
                />
                <path
                    d="M31.8008 21.9596C31.8008 21.9596 31.8007 22.5214 31.8008 34.0404"
                    stroke="white"
                    strokeWidth="3.92"
                />
              </svg>
            </div>

            <form className="login_form" onSubmit={handleFormSubmit}>
              <input
                  type="text"
                  className="login_input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username  "
              />
              <input
                  type="password"
                  className="login_input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
              />
              <Button
                  color="var(--theme_primary_color_white)"
                  bgcolor="var(--theme_primary_color_black)"
                  border="var(--theme_primary_color_black)"
                  id="login_button"
              >
                Login
              </Button>
            </form>

            {/* Notification Section */}
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
