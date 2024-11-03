import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Footer from '../../../components/Footer/Footer.tsx';
import Page from '../../../components/Page.tsx';
import Notification from '../../../components/Notification/Notification.tsx';
import './register.css';
import Button from '../../../components/Button.tsx';

export default function Register() {
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
        addNotification('Register failed. Please check your credentials.');
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Simulate a successful login (you can modify this to fit your actual flow)
        navigate('/admin');
      } else {
        addNotification('Register failed. Invalid username or password.');
      }
    } catch (error) {
      // If an error occurs or the server returns nothing
      addNotification(
        'Register failed. Server did not respond or returned an error.'
      );
    }
  };

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
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
    { label: 'Register' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Page className="login_page" gap="0px" style={{ height: pageHeight }}>
        <div className="logo_container">
          <svg
            width="209"
            height="80"
            viewBox="0 0 209 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" fill="#E40523" />
            <path
              d="M38.4 25.6001C38.4 25.6001 37.5975 25.6002 21.1418 25.6001C4.68607 25.6 4.68622 52.8001 21.1418 52.8001C37.5973 52.8001 38.4 52.8001 38.4 52.8001"
              stroke="white"
              stroke-width="5.6"
            />
            <path
              d="M42.4 25.6001C42.4 25.6001 43.2026 25.6002 59.6583 25.6001C76.114 25.6 76.1138 52.8001 59.6583 52.8001C43.2027 52.8001 42.4 52.8001 42.4 52.8001"
              stroke="white"
              stroke-width="5.6"
            />
            <path
              d="M46.4 39.2C46.4 39.2 47.2026 39.2 63.6583 39.2"
              stroke="white"
              stroke-width="5.6"
            />
            <path
              d="M45.4292 30.5708C45.4292 30.5708 45.4291 31.3734 45.4292 47.8291"
              stroke="white"
              stroke-width="5.6"
            />
            <path
              d="M98.1062 36L102.643 23.6042C102.9 22.9291 103.318 22.4227 103.899 22.0851C104.493 21.7341 105.162 21.5585 105.904 21.5585C106.647 21.5585 107.308 21.7273 107.889 22.0649C108.483 22.4025 108.909 22.9088 109.165 23.584L113.702 36H109.064L108.294 33.5289H103.453L102.643 36H98.1062ZM104.365 30.187H107.383L106.066 25.6297C106.053 25.5892 106.032 25.5622 106.005 25.5487C105.978 25.5217 105.945 25.5082 105.904 25.5082C105.877 25.5082 105.85 25.5217 105.823 25.5487C105.796 25.5622 105.776 25.5892 105.762 25.6297L104.365 30.187ZM120.154 36.2633C119.276 36.2633 118.479 36.1283 117.764 35.8582C117.062 35.5882 116.454 35.2033 115.941 34.7037C115.428 34.1906 115.029 33.5897 114.746 32.9011C114.476 32.2124 114.341 31.4495 114.341 30.6123C114.341 29.5321 114.564 28.5936 115.009 27.7969C115.455 27.0002 116.049 26.3791 116.792 25.9335C117.548 25.4879 118.392 25.2651 119.323 25.2651C119.702 25.2651 120.046 25.3056 120.356 25.3866C120.68 25.4541 120.978 25.5689 121.248 25.731C121.518 25.893 121.754 26.0955 121.957 26.3386H122.078V21.2142H125.967V30.5718C125.967 31.7195 125.724 32.7188 125.238 33.5695C124.752 34.4201 124.07 35.0818 123.192 35.5544C122.328 36.027 121.315 36.2633 120.154 36.2633ZM120.154 32.8605C120.518 32.8605 120.836 32.7728 121.106 32.5972C121.389 32.4217 121.605 32.1786 121.754 31.8681C121.916 31.544 121.997 31.1794 121.997 30.7743C121.997 30.3827 121.916 30.0384 121.754 29.7414C121.605 29.4443 121.389 29.208 121.106 29.0324C120.836 28.8569 120.518 28.7691 120.154 28.7691C119.803 28.7691 119.485 28.8569 119.202 29.0324C118.918 29.208 118.696 29.4443 118.534 29.7414C118.385 30.0384 118.311 30.3827 118.311 30.7743C118.311 31.1794 118.385 31.544 118.534 31.8681C118.696 32.1786 118.918 32.4217 119.202 32.5972C119.485 32.7728 119.803 32.8605 120.154 32.8605ZM127.678 36V29.8831C127.678 28.9379 127.887 28.121 128.306 27.4323C128.724 26.7437 129.305 26.2103 130.047 25.8322C130.804 25.4541 131.688 25.2651 132.701 25.2651C133.227 25.2651 133.713 25.3191 134.159 25.4271C134.605 25.5217 135.003 25.6567 135.354 25.8322C135.705 25.9943 136.002 26.1833 136.245 26.3994H136.306C136.563 26.1833 136.86 25.9943 137.197 25.8322C137.548 25.6567 137.947 25.5217 138.392 25.4271C138.838 25.3191 139.324 25.2651 139.851 25.2651C140.877 25.2651 141.768 25.4541 142.524 25.8322C143.28 26.2103 143.868 26.7437 144.286 27.4323C144.705 28.121 144.914 28.9379 144.914 29.8831V36H141.005V30.1464C141.005 29.8899 140.951 29.6603 140.843 29.4578C140.735 29.2417 140.58 29.0662 140.377 28.9312C140.175 28.7961 139.925 28.7286 139.628 28.7286C139.331 28.7286 139.074 28.7961 138.858 28.9312C138.656 29.0662 138.5 29.2417 138.392 29.4578C138.284 29.6603 138.23 29.8899 138.23 30.1464V36H134.362V30.1464C134.362 29.8899 134.301 29.6603 134.179 29.4578C134.071 29.2417 133.909 29.0662 133.693 28.9312C133.477 28.7961 133.221 28.7286 132.924 28.7286C132.64 28.7286 132.39 28.7961 132.174 28.9312C131.972 29.0662 131.816 29.2417 131.708 29.4578C131.6 29.6603 131.546 29.8899 131.546 30.1464V36H127.678ZM146.627 36V25.5082H150.516V36H146.627ZM148.571 24.4347C148.004 24.4347 147.518 24.2321 147.113 23.827C146.708 23.4084 146.505 22.9223 146.505 22.3687C146.505 21.8016 146.708 21.3155 147.113 20.9104C147.518 20.4918 148.004 20.2825 148.571 20.2825C149.138 20.2825 149.624 20.4918 150.029 20.9104C150.435 21.3155 150.637 21.8016 150.637 22.3687C150.637 22.9223 150.435 23.4084 150.029 23.827C149.624 24.2321 149.138 24.4347 148.571 24.4347ZM152.244 36V29.9642C152.244 29.0595 152.474 28.256 152.933 27.5539C153.392 26.8382 154.033 26.2778 154.857 25.8727C155.681 25.4676 156.639 25.2651 157.733 25.2651C158.827 25.2651 159.772 25.4676 160.569 25.8727C161.365 26.2778 161.973 26.8382 162.392 27.5539C162.824 28.256 163.04 29.0595 163.04 29.9642V36H159.151V30.2072C159.151 29.9506 159.09 29.7143 158.969 29.4983C158.847 29.2687 158.672 29.0865 158.442 28.9514C158.226 28.8029 157.963 28.7286 157.652 28.7286C157.342 28.7286 157.065 28.8029 156.822 28.9514C156.592 29.0865 156.417 29.2687 156.295 29.4983C156.174 29.7143 156.113 29.9506 156.113 30.2072V36H152.244Z"
              fill="#A0A0A0"
            />
            <path
              d="M98.9781 57V42.8218H104.994C106.479 42.8218 107.769 43.1257 108.862 43.7333C109.956 44.3409 110.8 45.1781 111.394 46.2448C112.002 47.3116 112.306 48.5336 112.306 49.9109C112.306 51.2882 112.002 52.5102 111.394 53.577C110.8 54.6437 109.956 55.4809 108.862 56.0885C107.769 56.6962 106.479 57 104.994 57H98.9781ZM103.353 53.577H104.751C105.358 53.577 105.898 53.4352 106.371 53.1516C106.844 52.8546 107.215 52.4292 107.485 51.8756C107.755 51.322 107.89 50.6671 107.89 49.9109C107.89 49.1547 107.755 48.5066 107.485 47.9665C107.215 47.4129 106.844 46.9875 106.371 46.6904C105.898 46.3934 105.358 46.2448 104.751 46.2448H103.353V53.577ZM118.089 57.2633C117.211 57.2633 116.421 57.0405 115.719 56.5949C115.017 56.1493 114.463 55.5349 114.058 54.7517C113.653 53.9551 113.451 53.0301 113.451 51.9769C113.451 50.8561 113.701 49.8704 114.2 49.0197C114.7 48.1555 115.388 47.4804 116.266 46.9943C117.157 46.5082 118.19 46.2651 119.365 46.2651C120.513 46.2651 121.512 46.5014 122.363 46.974C123.213 47.4331 123.875 48.0813 124.348 48.9184C124.834 49.7421 125.077 50.7008 125.077 51.7946V57H121.39V55.4404H121.269C121.093 55.805 120.857 56.1291 120.56 56.4126C120.276 56.6827 119.932 56.892 119.527 57.0405C119.122 57.189 118.643 57.2633 118.089 57.2633ZM119.284 53.8605C119.649 53.8605 119.966 53.7728 120.236 53.5972C120.52 53.4217 120.736 53.1786 120.884 52.8681C121.046 52.544 121.127 52.1794 121.127 51.7743C121.127 51.3827 121.046 51.0384 120.884 50.7414C120.736 50.4443 120.52 50.208 120.236 50.0324C119.966 49.8569 119.649 49.7691 119.284 49.7691C118.933 49.7691 118.616 49.8569 118.332 50.0324C118.048 50.208 117.826 50.4443 117.664 50.7414C117.515 51.0384 117.441 51.3827 117.441 51.7743C117.441 52.1794 117.515 52.544 117.664 52.8681C117.826 53.1786 118.048 53.4217 118.332 53.5972C118.616 53.7728 118.933 53.8605 119.284 53.8605ZM126.828 57V54.2454H131.729C131.837 54.2454 131.925 54.2251 131.992 54.1846C132.06 54.1306 132.114 54.0698 132.155 54.0023C132.195 53.9213 132.215 53.8403 132.215 53.7593C132.215 53.6783 132.195 53.604 132.155 53.5365C132.114 53.4555 132.06 53.3947 131.992 53.3542C131.925 53.3137 131.837 53.2934 131.729 53.2934H130.149C129.461 53.2934 128.833 53.1786 128.266 52.9491C127.699 52.706 127.246 52.3347 126.909 51.8351C126.585 51.322 126.422 50.6671 126.422 49.8704C126.422 49.2493 126.571 48.6889 126.868 48.1893C127.179 47.6762 127.597 47.2711 128.124 46.974C128.65 46.6634 129.231 46.5082 129.866 46.5082H135.193V49.2628H130.777C130.642 49.2628 130.527 49.31 130.433 49.4046C130.352 49.4991 130.311 49.6071 130.311 49.7286C130.311 49.8502 130.352 49.9582 130.433 50.0527C130.527 50.1472 130.642 50.1945 130.777 50.1945H132.236C133.019 50.1945 133.694 50.316 134.261 50.5591C134.842 50.7886 135.287 51.1532 135.598 51.6528C135.908 52.1524 136.064 52.8006 136.064 53.5972C136.064 54.2184 135.902 54.7855 135.578 55.2986C135.267 55.8117 134.848 56.2236 134.322 56.5341C133.795 56.8447 133.201 57 132.539 57H126.828ZM137.39 57V42.2142H141.259V47.0955C141.637 46.8255 142.055 46.6229 142.514 46.4879C142.973 46.3394 143.433 46.2651 143.892 46.2651C144.756 46.2651 145.505 46.4541 146.14 46.8322C146.788 47.2103 147.288 47.7504 147.639 48.4526C148.003 49.1547 148.186 49.9919 148.186 50.9642V57H144.297V51.3085C144.297 50.9709 144.223 50.6873 144.074 50.4578C143.939 50.2282 143.757 50.0527 143.527 49.9312C143.298 49.7961 143.054 49.7286 142.798 49.7286C142.528 49.7286 142.271 49.7894 142.028 49.9109C141.799 50.0324 141.61 50.2147 141.461 50.4578C141.326 50.6873 141.259 50.9642 141.259 51.2882V57H137.39ZM155.683 57.2633C154.535 57.2633 153.523 57.027 152.645 56.5544C151.767 56.0818 151.085 55.4201 150.599 54.5695C150.113 53.7188 149.87 52.7195 149.87 51.5718V42.2142H153.759V47.3386H153.88C154.083 47.0955 154.319 46.893 154.589 46.731C154.859 46.5689 155.157 46.4541 155.481 46.3866C155.805 46.3056 156.149 46.2651 156.514 46.2651C157.445 46.2651 158.289 46.4879 159.045 46.9335C159.802 47.3791 160.396 48.0002 160.828 48.7969C161.273 49.5936 161.496 50.5321 161.496 51.6123C161.496 52.4495 161.354 53.2124 161.071 53.9011C160.801 54.5897 160.409 55.1906 159.896 55.7037C159.383 56.2033 158.769 56.5882 158.053 56.8582C157.351 57.1283 156.561 57.2633 155.683 57.2633ZM155.683 53.8605C156.048 53.8605 156.365 53.7728 156.635 53.5972C156.919 53.4217 157.135 53.1786 157.283 52.8681C157.445 52.544 157.526 52.1794 157.526 51.7743C157.526 51.3827 157.445 51.0384 157.283 50.7414C157.135 50.4443 156.919 50.208 156.635 50.0324C156.365 49.8569 156.048 49.7691 155.683 49.7691C155.332 49.7691 155.015 49.8569 154.731 50.0324C154.448 50.208 154.225 50.4443 154.063 50.7414C153.914 51.0384 153.84 51.3827 153.84 51.7743C153.84 52.1794 153.914 52.544 154.063 52.8681C154.225 53.1786 154.448 53.4217 154.731 53.5972C155.015 53.7728 155.332 53.8605 155.683 53.8605ZM168.534 57.2431C167.481 57.2431 166.515 57.0135 165.637 56.5544C164.773 56.0953 164.078 55.4539 163.551 54.6302C163.038 53.793 162.782 52.8343 162.782 51.7541C162.782 50.6738 163.038 49.7219 163.551 48.8982C164.078 48.0745 164.78 47.4331 165.658 46.974C166.535 46.5014 167.501 46.2651 168.554 46.2651C169.607 46.2651 170.566 46.5014 171.43 46.974C172.294 47.4331 172.983 48.0745 173.496 48.8982C174.009 49.7219 174.266 50.6738 174.266 51.7541C174.266 52.8343 174.009 53.793 173.496 54.6302C172.983 55.4539 172.288 56.0953 171.41 56.5544C170.546 57.0135 169.587 57.2431 168.534 57.2431ZM168.534 53.7593C168.898 53.7593 169.222 53.6715 169.506 53.496C169.79 53.3204 170.006 53.0841 170.154 52.7871C170.316 52.4765 170.397 52.1254 170.397 51.7338C170.397 51.3422 170.316 50.9979 170.154 50.7008C170.006 50.4038 169.79 50.1675 169.506 49.9919C169.222 49.8164 168.898 49.7286 168.534 49.7286C168.169 49.7286 167.845 49.8164 167.562 49.9919C167.278 50.1675 167.055 50.4038 166.893 50.7008C166.731 50.9979 166.65 51.3422 166.65 51.7338C166.65 52.1254 166.731 52.4765 166.893 52.7871C167.055 53.0841 167.278 53.3204 167.562 53.496C167.845 53.6715 168.169 53.7593 168.534 53.7593ZM180.158 57.2633C179.28 57.2633 178.49 57.0405 177.788 56.5949C177.086 56.1493 176.532 55.5349 176.127 54.7517C175.722 53.9551 175.52 53.0301 175.52 51.9769C175.52 50.8561 175.77 49.8704 176.269 49.0197C176.769 48.1555 177.457 47.4804 178.335 46.9943C179.226 46.5082 180.259 46.2651 181.434 46.2651C182.582 46.2651 183.581 46.5014 184.432 46.974C185.282 47.4331 185.944 48.0813 186.417 48.9184C186.903 49.7421 187.146 50.7008 187.146 51.7946V57H183.46V55.4404H183.338C183.162 55.805 182.926 56.1291 182.629 56.4126C182.346 56.6827 182.001 56.892 181.596 57.0405C181.191 57.189 180.712 57.2633 180.158 57.2633ZM181.353 53.8605C181.718 53.8605 182.035 53.7728 182.305 53.5972C182.589 53.4217 182.805 53.1786 182.953 52.8681C183.115 52.544 183.196 52.1794 183.196 51.7743C183.196 51.3827 183.115 51.0384 182.953 50.7414C182.805 50.4443 182.589 50.208 182.305 50.0324C182.035 49.8569 181.718 49.7691 181.353 49.7691C181.002 49.7691 180.685 49.8569 180.401 50.0324C180.118 50.208 179.895 50.4443 179.733 50.7414C179.584 51.0384 179.51 51.3827 179.51 51.7743C179.51 52.1794 179.584 52.544 179.733 52.8681C179.895 53.1786 180.118 53.4217 180.401 53.5972C180.685 53.7728 181.002 53.8605 181.353 53.8605ZM188.856 57V49.7691C188.856 48.7699 189.146 47.98 189.727 47.3994C190.308 46.8187 191.118 46.5284 192.158 46.5284H195.52V49.4653H193.515C193.285 49.4653 193.096 49.5396 192.947 49.6881C192.812 49.8231 192.745 50.0054 192.745 50.235V57H188.856ZM202.26 57.2633C201.383 57.2633 200.586 57.1283 199.87 56.8582C199.168 56.5882 198.56 56.2033 198.047 55.7037C197.534 55.1906 197.136 54.5897 196.852 53.9011C196.582 53.2124 196.447 52.4495 196.447 51.6123C196.447 50.5321 196.67 49.5936 197.116 48.7969C197.561 48.0002 198.155 47.3791 198.898 46.9335C199.654 46.4879 200.498 46.2651 201.43 46.2651C201.808 46.2651 202.152 46.3056 202.463 46.3866C202.787 46.4541 203.084 46.5689 203.354 46.731C203.624 46.893 203.86 47.0955 204.063 47.3386H204.184V42.2142H208.073V51.5718C208.073 52.7195 207.83 53.7188 207.344 54.5695C206.858 55.4201 206.176 56.0818 205.298 56.5544C204.434 57.027 203.422 57.2633 202.26 57.2633ZM202.26 53.8605C202.625 53.8605 202.942 53.7728 203.212 53.5972C203.496 53.4217 203.712 53.1786 203.86 52.8681C204.022 52.544 204.103 52.1794 204.103 51.7743C204.103 51.3827 204.022 51.0384 203.86 50.7414C203.712 50.4443 203.496 50.208 203.212 50.0324C202.942 49.8569 202.625 49.7691 202.26 49.7691C201.909 49.7691 201.592 49.8569 201.308 50.0324C201.025 50.208 200.802 50.4443 200.64 50.7414C200.491 51.0384 200.417 51.3827 200.417 51.7743C200.417 52.1794 200.491 52.544 200.64 52.8681C200.802 53.1786 201.025 53.4217 201.308 53.5972C201.592 53.7728 201.909 53.8605 202.26 53.8605Z"
              fill="#A0A0A0"
            />
          </svg>
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
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username  "
            />
            <label className="login_form_label">
              <p className="label">Password</p>
            </label>
            <input
              type="password"
              className="login_input"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <Button
              color="var(--theme_primary_color_white)"
              bgcolor="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_black)"
              id="login_button"
            >
              Sign in
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