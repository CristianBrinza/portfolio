//components/Navbar.tsx
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button.tsx';
import Icon from '../Icon.tsx';
import Popup from '../Popup/Popup.tsx';

const Langelect: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="Langelect_background" onClick={onClose}>
    <div className="Langelect_container">
      <div className="Langelect_close_btn" onClick={onClose}>
        <Icon type="close" />
      </div>
      Langelect_background
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showLangPopup, setShowPopup] = useState(false);

  const { t, i18n } = useTranslation();
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
  const toggleLang = () => setShowPopup(!showLangPopup);

  return (
    <>
      <nav className="navbar">
        <Link className="nav-brand" to={`/${t('lang')}`}>
          <svg
            width="200"
            height="58"
            viewBox="0 0 200 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="56"
              height="56"
              transform="translate(0 1)"
              fill="#E40523"
            />
            <path
              d="M26.8799 19.48C26.8799 19.48 26.3181 19.48 14.7991 19.48C3.28013 19.4799 3.28023 38.52 14.7991 38.52C26.318 38.52 26.8799 38.52 26.8799 38.52"
              stroke="white"
              strokeWidth="3.92"
            />
            <path
              d="M29.6799 19.48C29.6799 19.48 30.2417 19.48 41.7607 19.48C53.2797 19.4799 53.2796 38.52 41.7607 38.52C30.2418 38.52 29.6799 38.52 29.6799 38.52"
              stroke="white"
              strokeWidth="3.92"
            />
            <path
              d="M32.48 29C32.48 29 33.0418 29.0001 44.5608 29"
              stroke="white"
              strokeWidth="3.92"
            />
            <path
              d="M31.8005 22.9596C31.8005 22.9596 31.8005 23.5214 31.8005 35.0404"
              stroke="white"
              strokeWidth="3.92"
            />
            <path
              d="M70.8609 36C70.0553 35.9899 69.3202 35.8489 68.6555 35.577C68.001 35.2951 67.432 34.9124 66.9486 34.429C66.4753 33.9457 66.1077 33.3868 65.8459 32.7523C65.5841 32.1078 65.4532 31.423 65.4532 30.698C65.4532 29.9729 65.5841 29.2932 65.8459 28.6587C66.1077 28.0243 66.4753 27.4704 66.9486 26.9971C67.432 26.5138 68.001 26.1311 68.6555 25.8491C69.3202 25.5672 70.0553 25.4262 70.8609 25.4262H72.0845V26.3929H70.9062C70.2919 26.403 69.7179 26.5188 69.1842 26.7404C68.6606 26.9518 68.2024 27.2539 67.8096 27.6467C67.4169 28.0294 67.1097 28.4825 66.8882 29.0062C66.6767 29.5298 66.571 30.0938 66.571 30.698C66.571 31.3223 66.6767 31.8963 66.8882 32.42C67.1097 32.9336 67.4169 33.3868 67.8096 33.7795C68.2024 34.1722 68.6606 34.4794 69.1842 34.7009C69.7179 34.9124 70.2919 35.0181 70.9062 35.0181H72.0845V36H70.8609ZM73.7903 36V25.4262H78.3824C79.0269 25.4262 79.616 25.5672 80.1497 25.8491C80.6834 26.1311 81.1064 26.5238 81.4186 27.0274C81.7408 27.5309 81.902 28.1149 81.902 28.7796C81.902 29.4946 81.7157 30.1189 81.343 30.6527C80.9704 31.1864 80.472 31.5791 79.8476 31.8309L81.0409 34.4139C81.1416 34.6254 81.2524 34.7815 81.3733 34.8822C81.4941 34.9728 81.6603 35.0181 81.8717 35.0181H82.5062V36H81.7207C81.338 36 81.0107 35.9043 80.7388 35.713C80.4669 35.5217 80.2404 35.2498 80.0591 34.8973L78.76 32.0877C78.6392 32.0978 78.5133 32.1078 78.3824 32.1179C78.2615 32.128 78.1407 32.133 78.0198 32.133H74.8779V36H73.7903ZM74.8779 31.1663H78.2011C78.6845 31.1663 79.1225 31.0756 79.5153 30.8944C79.908 30.703 80.2202 30.4311 80.4518 30.0787C80.6935 29.7161 80.8144 29.2831 80.8144 28.7796C80.8144 28.2861 80.6935 27.8582 80.4518 27.4956C80.2202 27.1331 79.908 26.8612 79.5153 26.6799C79.1326 26.4886 78.7097 26.3929 78.2464 26.3929H74.8779V31.1663ZM83.5757 36V35.0333H85.6754V26.3929H83.5757V25.4262H88.8626V26.3929H86.763V35.0333H88.8626V36H83.5757ZM90.7674 36V35.0333H95.3746C95.7875 35.0333 96.14 34.9376 96.432 34.7462C96.7341 34.5549 96.9607 34.3082 97.1117 34.0061C97.2628 33.6939 97.3383 33.3716 97.3383 33.0393C97.3383 32.707 97.2628 32.3948 97.1117 32.1028C96.9708 31.8108 96.7542 31.5741 96.4622 31.3928C96.1802 31.2116 95.8378 31.1209 95.435 31.1209H93.3203C92.716 31.1209 92.1924 31.0001 91.7493 30.7584C91.3163 30.5066 90.9789 30.1693 90.7372 29.7463C90.5056 29.3234 90.3898 28.8501 90.3898 28.3264C90.3898 27.8028 90.5056 27.3244 90.7372 26.8914C90.9789 26.4483 91.3163 26.0959 91.7493 25.834C92.1924 25.5621 92.716 25.4262 93.3203 25.4262H97.7462V26.3929H93.3958C93.0031 26.3929 92.6607 26.4836 92.3686 26.6648C92.0867 26.8461 91.8651 27.0827 91.704 27.3748C91.5529 27.6567 91.4774 27.9538 91.4774 28.266C91.4774 28.5782 91.5479 28.8753 91.6889 29.1572C91.8399 29.4392 92.0514 29.6708 92.3233 29.8521C92.6053 30.0233 92.9477 30.1089 93.3505 30.1089H95.4803C96.1148 30.1089 96.6485 30.2347 97.0815 30.4865C97.5246 30.7383 97.8569 31.0807 98.0785 31.5137C98.3101 31.9366 98.4259 32.4049 98.4259 32.9185C98.4259 33.4925 98.3051 34.0161 98.0634 34.4895C97.8318 34.9527 97.4944 35.3203 97.0513 35.5922C96.6183 35.8641 96.0946 36 95.4803 36H90.7674ZM105.509 36C104.976 36 104.512 35.8892 104.12 35.6677C103.727 35.4361 103.425 35.1188 103.213 34.716C103.002 34.3132 102.896 33.855 102.896 33.3414V26.3929H99.5427V25.4262H107.337V26.3929H103.984V33.4925C103.984 33.9356 104.12 34.3032 104.392 34.5952C104.673 34.8872 105.051 35.0333 105.524 35.0333H106.189V36H105.509ZM108.535 36V35.0333H110.635V26.3929H108.535V25.4262H113.822V26.3929H111.722V35.0333H113.822V36H108.535ZM114.654 36L118.34 26.3476C118.491 25.9549 118.682 25.6729 118.914 25.5017C119.156 25.3204 119.438 25.2298 119.76 25.2298C120.092 25.2298 120.379 25.3154 120.621 25.4866C120.863 25.6578 121.054 25.9398 121.195 26.3325L124.911 36H123.718L122.66 33.2206H116.86L115.802 36H114.654ZM117.192 32.2538H122.328L120.274 26.7101C120.213 26.549 120.143 26.4231 120.062 26.3325C119.992 26.2419 119.896 26.1966 119.775 26.1966C119.644 26.1966 119.544 26.2419 119.473 26.3325C119.413 26.4231 119.347 26.549 119.277 26.7101L117.192 32.2538ZM132.976 36.1964C132.452 36.1964 131.984 36.0755 131.571 35.8338C131.158 35.5821 130.836 35.2447 130.605 34.8218C130.373 34.3888 130.257 33.9003 130.257 33.3565V27.9035C130.257 27.5812 130.182 27.2942 130.031 27.0425C129.879 26.7806 129.678 26.5792 129.426 26.4382C129.185 26.2872 128.913 26.2117 128.611 26.2117C128.309 26.2117 128.032 26.2872 127.78 26.4382C127.528 26.5792 127.327 26.7806 127.176 27.0425C127.025 27.2942 126.949 27.5812 126.949 27.9035V36H125.861V28.0696C125.861 27.5158 125.977 27.0274 126.209 26.6044C126.44 26.1814 126.763 25.8491 127.176 25.6074C127.589 25.3557 128.067 25.2298 128.611 25.2298C129.144 25.2298 129.618 25.3557 130.031 25.6074C130.443 25.8491 130.766 26.1814 130.997 26.6044C131.239 27.0274 131.36 27.5158 131.36 28.0696V33.5227C131.36 33.855 131.435 34.1471 131.586 34.3988C131.737 34.6506 131.934 34.852 132.176 35.003C132.417 35.144 132.684 35.2145 132.976 35.2145C133.268 35.2145 133.535 35.144 133.777 35.003C134.018 34.852 134.21 34.6506 134.351 34.3988C134.492 34.1471 134.562 33.855 134.562 33.5227V25.4262H135.65V33.3565C135.65 33.9003 135.539 34.3888 135.317 34.8218C135.096 35.2447 134.784 35.5821 134.381 35.8338C133.978 36.0755 133.51 36.1964 132.976 36.1964ZM141.971 36V25.4262H147.606C148.16 25.4262 148.638 25.547 149.041 25.7887C149.444 26.0304 149.756 26.3526 149.977 26.7555C150.209 27.1482 150.325 27.5913 150.325 28.0847C150.325 28.4372 150.244 28.7846 150.083 29.127C149.932 29.4593 149.721 29.7514 149.449 30.0031C149.177 30.2549 148.854 30.4362 148.482 30.5469C148.905 30.6376 149.272 30.8138 149.585 31.0756C149.907 31.3374 150.154 31.6496 150.325 32.0122C150.496 32.3747 150.582 32.7624 150.582 33.1753C150.582 33.6788 150.466 34.1471 150.234 34.5801C150.013 35.0131 149.68 35.3605 149.237 35.6224C148.804 35.8741 148.28 36 147.666 36H141.971ZM143.059 35.0181H147.47C147.903 35.0181 148.27 34.9275 148.573 34.7462C148.875 34.5549 149.101 34.3082 149.252 34.0061C149.413 33.6939 149.494 33.3666 149.494 33.0242C149.494 32.6919 149.408 32.3797 149.237 32.0877C149.076 31.7856 148.839 31.5439 148.527 31.3626C148.225 31.1814 147.847 31.0907 147.394 31.0907H143.059V35.0181ZM143.059 30.1391H147.183C147.596 30.1391 147.953 30.0484 148.255 29.8672C148.567 29.6859 148.804 29.4543 148.965 29.1723C149.136 28.8803 149.222 28.5681 149.222 28.2358C149.222 27.9135 149.147 27.6114 148.995 27.3295C148.844 27.0475 148.623 26.8209 148.331 26.6497C148.049 26.4785 147.711 26.3929 147.319 26.3929H143.059V30.1391ZM152.43 36V25.4262H157.022C157.667 25.4262 158.256 25.5672 158.79 25.8491C159.323 26.1311 159.746 26.5238 160.058 27.0274C160.381 27.5309 160.542 28.1149 160.542 28.7796C160.542 29.4946 160.356 30.1189 159.983 30.6527C159.61 31.1864 159.112 31.5791 158.487 31.8309L159.681 34.4139C159.782 34.6254 159.892 34.7815 160.013 34.8822C160.134 34.9728 160.3 35.0181 160.512 35.0181H161.146V36H160.361C159.978 36 159.651 35.9043 159.379 35.713C159.107 35.5217 158.88 35.2498 158.699 34.8973L157.4 32.0877C157.279 32.0978 157.153 32.1078 157.022 32.1179C156.901 32.128 156.781 32.133 156.66 32.133H153.518V36H152.43ZM153.518 31.1663H156.841C157.324 31.1663 157.762 31.0756 158.155 30.8944C158.548 30.703 158.86 30.4311 159.092 30.0787C159.333 29.7161 159.454 29.2831 159.454 28.7796C159.454 28.2861 159.333 27.8582 159.092 27.4956C158.86 27.1331 158.548 26.8612 158.155 26.6799C157.772 26.4886 157.35 26.3929 156.886 26.3929H153.518V31.1663ZM162.216 36V35.0333H164.315V26.3929H162.216V25.4262H167.502V26.3929H165.403V35.0333H167.502V36H162.216ZM176.537 36.1964C176.013 36.1964 175.545 36.0755 175.132 35.8338C174.719 35.5821 174.397 35.2447 174.166 34.8218C173.934 34.3888 173.818 33.9003 173.818 33.3565V27.9035C173.818 27.5812 173.743 27.2942 173.592 27.0425C173.44 26.7806 173.239 26.5792 172.987 26.4382C172.746 26.2872 172.474 26.2117 172.172 26.2117C171.869 26.2117 171.593 26.2872 171.341 26.4382C171.089 26.5792 170.888 26.7806 170.737 27.0425C170.586 27.2942 170.51 27.5812 170.51 27.9035V36H169.422V28.0696C169.422 27.5158 169.538 27.0274 169.77 26.6044C170.001 26.1814 170.324 25.8491 170.737 25.6074C171.149 25.3557 171.628 25.2298 172.172 25.2298C172.705 25.2298 173.179 25.3557 173.592 25.6074C174.004 25.8491 174.327 26.1814 174.558 26.6044C174.8 27.0274 174.921 27.5158 174.921 28.0696V33.5227C174.921 33.855 174.996 34.1471 175.147 34.3988C175.298 34.6506 175.495 34.852 175.736 35.003C175.978 35.144 176.245 35.2145 176.537 35.2145C176.829 35.2145 177.096 35.144 177.338 35.003C177.579 34.852 177.771 34.6506 177.912 34.3988C178.053 34.1471 178.123 33.855 178.123 33.5227V25.4262H179.211V33.3565C179.211 33.9003 179.1 34.3888 178.878 34.8218C178.657 35.2447 178.345 35.5821 177.942 35.8338C177.539 36.0755 177.071 36.1964 176.537 36.1964ZM183.196 36C182.562 36 182.058 35.8036 181.686 35.4109C181.323 35.0181 181.142 34.5499 181.142 34.0061C181.142 33.6234 181.223 33.3012 181.384 33.0393C181.555 32.7775 181.822 32.5056 182.184 32.2236L186.988 28.4171C187.24 28.2358 187.411 28.0696 187.501 27.9186C187.592 27.7575 187.637 27.5661 187.637 27.3446C187.637 27.1935 187.597 27.0475 187.517 26.9065C187.436 26.7555 187.325 26.6346 187.184 26.544C187.043 26.4433 186.882 26.3929 186.701 26.3929H181.505L181.52 25.4262H186.746C187.179 25.4262 187.547 25.5168 187.849 25.6981C188.151 25.8793 188.383 26.116 188.544 26.408C188.705 26.7001 188.785 27.0223 188.785 27.3748C188.785 27.7776 188.695 28.125 188.513 28.4171C188.332 28.699 188.065 28.9709 187.713 29.2328L182.97 33.0091C182.789 33.14 182.648 33.2558 182.547 33.3565C182.446 33.4572 182.371 33.563 182.32 33.6738C182.28 33.7745 182.26 33.9054 182.26 34.0665C182.26 34.2075 182.3 34.3535 182.381 34.5046C182.471 34.6556 182.592 34.7815 182.743 34.8822C182.904 34.9829 183.086 35.0333 183.287 35.0333H188.755V36H183.196ZM188.913 36L192.599 26.3476C192.75 25.9549 192.941 25.6729 193.173 25.5017C193.414 25.3204 193.696 25.2298 194.019 25.2298C194.351 25.2298 194.638 25.3154 194.88 25.4866C195.121 25.6578 195.313 25.9398 195.454 26.3325L199.17 36H197.976L196.919 33.2206H191.118L190.061 36H188.913ZM191.451 32.2538H196.587L194.532 26.7101C194.472 26.549 194.401 26.4231 194.321 26.3325C194.25 26.2419 194.155 26.1966 194.034 26.1966C193.903 26.1966 193.802 26.2419 193.732 26.3325C193.671 26.4231 193.606 26.549 193.535 26.7101L191.451 32.2538Z"
              fill="var(--theme_primary_color_black)"
            />
          </svg>
        </Link>
        <button className="menu-icon" onClick={toggleMenuVisibility}>
          <Icon
            type="menu"
            size="30px"
            color="var(--theme_primary_color_black)"
          />
        </button>
        <div className={`nav-items ${isMenuVisible ? 'visible' : ''}`}>
          <a onClick={toggleLangPopup} style={{ cursor: 'Pointer' }}>
            {i18n.language === 'en'
              ? 'en'
              : i18n.language === 'ro'
                ? 'ro'
                : 'ru'}
            &nbsp;
            <span style={{ fontWeight: '500' }}> |</span>&nbsp;
            <Icon type="lang" />
          </a>

          <a onClick={toggleTheme}>
            <Icon type={isDarkMode ? 'dark_mode' : 'light_mode'} />
          </a>

          <Link to="/blog">{t('navbar.blog')}</Link>
          <Link to="/about">{t('navbar.about')}</Link>
          <Button
            to="/contact"
            color="#ffffff"
            hover_bgcolor="#8E001D"
            bgcolor="#E40523"
            hover_color="#ffffff"
          >
            {t('navbar.contact')}
          </Button>
          <Button
            to="/portfolio"
            color="var(--theme_primary_color_black)"
            border="#F2F3F7"
            bgcolor="transparent"
          >
            {t('navbar.work')}
          </Button>
        </div>
      </nav>
      {showLangPopup && <Langelect onClose={toggleLang} />}

      {isListLangPopupVisible && (
        <Popup
          id="list_all_operators_popup"
          isVisible={isListLangPopupVisible}
          onClose={toggleLangPopup}
        >
          <div>
            <div id="navbar_lang_select_btns">
              <Button
                onClick={() => handleChangeLanguage('ro')}
                bgcolor="#F2F3F7"
                color="#1d1d1f"
              >
                {t('navbar.romanian')}
              </Button>
              <Button
                onClick={() => handleChangeLanguage('en')}
                bgcolor="#F2F3F7"
                color="#1d1d1f"
              >
                {t('navbar.english')}
              </Button>
              <Button
                onClick={() => handleChangeLanguage('ru')}
                bgcolor="#F2F3F7"
                color="#1d1d1f"
              >
                {t('navbar.russian')}
              </Button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default Navbar;