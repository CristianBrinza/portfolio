import { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Footer from '../../../components/Footer/Footer.tsx';
import Page from '../../../components/Page.tsx';
import './login.css';
import Button from '../../../components/Button.tsx';

export default function Login() {
  const [pageHeight, setPageHeight] = useState('calc(100vh - 160px)');

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

          <form className="login_form">
            <input
              type="text"
              className="login_input"
              placeholder="Username"
              required
            />
            <input
              type="password"
              className="login_input"
              placeholder="Password"
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
        </div>
      </Page>
      <Footer />
    </>
  );
}
