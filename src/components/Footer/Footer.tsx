import React from 'react';
import './Footer.css';
import Button from '../Button.tsx';
import Icon from '../Icon.tsx';
import { useTranslation } from 'react-i18next';
import LinkButton from '../LinkButton.tsx';

const Footer: React.FC = () => {
  const {
    t,
    i18n: {},
  } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This triggers the smooth scrolling
    });
  };

  return (
    <div className="footer">
      <div className="footer_main">
        <div className="main">
          <div className="footer_main_top">
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
                d="M31.8005 22.9595C31.8005 22.9595 31.8005 23.5214 31.8005 35.0403"
                stroke="white"
                strokeWidth="3.92"
              />
              <path
                d="M70.8609 36C70.0553 35.9899 69.3202 35.8489 68.6555 35.577C68.001 35.2951 67.432 34.9124 66.9486 34.429C66.4753 33.9457 66.1077 33.3868 65.8459 32.7523C65.5841 32.1078 65.4532 31.423 65.4532 30.698C65.4532 29.9729 65.5841 29.2932 65.8459 28.6587C66.1077 28.0243 66.4753 27.4704 66.9486 26.9971C67.432 26.5138 68.001 26.1311 68.6555 25.8491C69.3202 25.5672 70.0553 25.4262 70.8609 25.4262H72.0845V26.3929H70.9062C70.2919 26.403 69.7179 26.5188 69.1842 26.7404C68.6606 26.9518 68.2024 27.2539 67.8096 27.6467C67.4169 28.0294 67.1097 28.4825 66.8882 29.0062C66.6767 29.5298 66.571 30.0938 66.571 30.698C66.571 31.3223 66.6767 31.8963 66.8882 32.42C67.1097 32.9336 67.4169 33.3868 67.8096 33.7795C68.2024 34.1722 68.6606 34.4794 69.1842 34.7009C69.7179 34.9124 70.2919 35.0181 70.9062 35.0181H72.0845V36H70.8609ZM73.7903 36V25.4262H78.3824C79.0269 25.4262 79.616 25.5672 80.1497 25.8491C80.6834 26.1311 81.1064 26.5238 81.4186 27.0274C81.7408 27.5309 81.902 28.1149 81.902 28.7796C81.902 29.4946 81.7157 30.1189 81.343 30.6527C80.9704 31.1864 80.472 31.5791 79.8476 31.8309L81.0409 34.4139C81.1416 34.6254 81.2524 34.7815 81.3733 34.8822C81.4941 34.9728 81.6603 35.0181 81.8717 35.0181H82.5062V36H81.7207C81.338 36 81.0107 35.9043 80.7388 35.713C80.4669 35.5217 80.2404 35.2498 80.0591 34.8973L78.76 32.0877C78.6392 32.0978 78.5133 32.1078 78.3824 32.1179C78.2615 32.128 78.1407 32.133 78.0198 32.133H74.8779V36H73.7903ZM74.8779 31.1663H78.2011C78.6845 31.1663 79.1225 31.0756 79.5153 30.8944C79.908 30.703 80.2202 30.4311 80.4518 30.0787C80.6935 29.7161 80.8144 29.2831 80.8144 28.7796C80.8144 28.2861 80.6935 27.8582 80.4518 27.4956C80.2202 27.1331 79.908 26.8612 79.5153 26.6799C79.1326 26.4886 78.7097 26.3929 78.2464 26.3929H74.8779V31.1663ZM83.5757 36V35.0333H85.6754V26.3929H83.5757V25.4262H88.8626V26.3929H86.763V35.0333H88.8626V36H83.5757ZM90.7674 36V35.0333H95.3746C95.7875 35.0333 96.14 34.9376 96.432 34.7462C96.7341 34.5549 96.9607 34.3082 97.1117 34.0061C97.2628 33.6939 97.3383 33.3716 97.3383 33.0393C97.3383 32.707 97.2628 32.3948 97.1117 32.1028C96.9708 31.8108 96.7542 31.5741 96.4622 31.3928C96.1802 31.2116 95.8378 31.1209 95.435 31.1209H93.3203C92.716 31.1209 92.1924 31.0001 91.7493 30.7584C91.3163 30.5066 90.9789 30.1693 90.7372 29.7463C90.5056 29.3234 90.3898 28.8501 90.3898 28.3264C90.3898 27.8028 90.5056 27.3244 90.7372 26.8914C90.9789 26.4483 91.3163 26.0959 91.7493 25.834C92.1924 25.5621 92.716 25.4262 93.3203 25.4262H97.7462V26.3929H93.3958C93.0031 26.3929 92.6607 26.4836 92.3686 26.6648C92.0867 26.8461 91.8651 27.0827 91.704 27.3748C91.5529 27.6567 91.4774 27.9538 91.4774 28.266C91.4774 28.5782 91.5479 28.8753 91.6889 29.1572C91.8399 29.4392 92.0514 29.6708 92.3233 29.8521C92.6053 30.0233 92.9477 30.1089 93.3505 30.1089H95.4803C96.1148 30.1089 96.6485 30.2347 97.0815 30.4865C97.5246 30.7383 97.8569 31.0807 98.0785 31.5137C98.3101 31.9366 98.4259 32.4049 98.4259 32.9185C98.4259 33.4925 98.3051 34.0161 98.0634 34.4895C97.8318 34.9527 97.4944 35.3203 97.0513 35.5922C96.6183 35.8641 96.0946 36 95.4803 36H90.7674ZM105.509 36C104.976 36 104.512 35.8892 104.12 35.6677C103.727 35.4361 103.425 35.1188 103.213 34.716C103.002 34.3132 102.896 33.855 102.896 33.3414V26.3929H99.5427V25.4262H107.337V26.3929H103.984V33.4925C103.984 33.9356 104.12 34.3032 104.392 34.5952C104.673 34.8872 105.051 35.0333 105.524 35.0333H106.189V36H105.509ZM108.535 36V35.0333H110.635V26.3929H108.535V25.4262H113.822V26.3929H111.722V35.0333H113.822V36H108.535ZM114.654 36L118.34 26.3476C118.491 25.9549 118.682 25.6729 118.914 25.5017C119.156 25.3204 119.438 25.2298 119.76 25.2298C120.092 25.2298 120.379 25.3154 120.621 25.4866C120.863 25.6578 121.054 25.9398 121.195 26.3325L124.911 36H123.718L122.66 33.2206H116.86L115.802 36H114.654ZM117.192 32.2538H122.328L120.274 26.7101C120.213 26.549 120.143 26.4231 120.062 26.3325C119.992 26.2419 119.896 26.1966 119.775 26.1966C119.644 26.1966 119.544 26.2419 119.473 26.3325C119.413 26.4231 119.347 26.549 119.277 26.7101L117.192 32.2538ZM132.976 36.1964C132.452 36.1964 131.984 36.0755 131.571 35.8338C131.158 35.5821 130.836 35.2447 130.605 34.8218C130.373 34.3888 130.257 33.9003 130.257 33.3565V27.9035C130.257 27.5812 130.182 27.2942 130.031 27.0425C129.879 26.7806 129.678 26.5792 129.426 26.4382C129.185 26.2872 128.913 26.2117 128.611 26.2117C128.309 26.2117 128.032 26.2872 127.78 26.4382C127.528 26.5792 127.327 26.7806 127.176 27.0425C127.025 27.2942 126.949 27.5812 126.949 27.9035V36H125.861V28.0696C125.861 27.5158 125.977 27.0274 126.209 26.6044C126.44 26.1814 126.763 25.8491 127.176 25.6074C127.589 25.3557 128.067 25.2298 128.611 25.2298C129.144 25.2298 129.618 25.3557 130.031 25.6074C130.443 25.8491 130.766 26.1814 130.997 26.6044C131.239 27.0274 131.36 27.5158 131.36 28.0696V33.5227C131.36 33.855 131.435 34.1471 131.586 34.3988C131.737 34.6506 131.934 34.852 132.176 35.003C132.417 35.144 132.684 35.2145 132.976 35.2145C133.268 35.2145 133.535 35.144 133.777 35.003C134.018 34.852 134.21 34.6506 134.351 34.3988C134.492 34.1471 134.562 33.855 134.562 33.5227V25.4262H135.65V33.3565C135.65 33.9003 135.539 34.3888 135.317 34.8218C135.096 35.2447 134.784 35.5821 134.381 35.8338C133.978 36.0755 133.51 36.1964 132.976 36.1964ZM141.971 36V25.4262H147.606C148.16 25.4262 148.638 25.547 149.041 25.7887C149.444 26.0304 149.756 26.3526 149.977 26.7555C150.209 27.1482 150.325 27.5913 150.325 28.0847C150.325 28.4372 150.244 28.7846 150.083 29.127C149.932 29.4593 149.721 29.7514 149.449 30.0031C149.177 30.2549 148.854 30.4362 148.482 30.5469C148.905 30.6376 149.272 30.8138 149.585 31.0756C149.907 31.3374 150.154 31.6496 150.325 32.0122C150.496 32.3747 150.582 32.7624 150.582 33.1753C150.582 33.6788 150.466 34.1471 150.234 34.5801C150.013 35.0131 149.68 35.3605 149.237 35.6224C148.804 35.8741 148.28 36 147.666 36H141.971ZM143.059 35.0181H147.47C147.903 35.0181 148.27 34.9275 148.573 34.7462C148.875 34.5549 149.101 34.3082 149.252 34.0061C149.413 33.6939 149.494 33.3666 149.494 33.0242C149.494 32.6919 149.408 32.3797 149.237 32.0877C149.076 31.7856 148.839 31.5439 148.527 31.3626C148.225 31.1814 147.847 31.0907 147.394 31.0907H143.059V35.0181ZM143.059 30.1391H147.183C147.596 30.1391 147.953 30.0484 148.255 29.8672C148.567 29.6859 148.804 29.4543 148.965 29.1723C149.136 28.8803 149.222 28.5681 149.222 28.2358C149.222 27.9135 149.147 27.6114 148.995 27.3295C148.844 27.0475 148.623 26.8209 148.331 26.6497C148.049 26.4785 147.711 26.3929 147.319 26.3929H143.059V30.1391ZM152.43 36V25.4262H157.022C157.667 25.4262 158.256 25.5672 158.79 25.8491C159.323 26.1311 159.746 26.5238 160.058 27.0274C160.381 27.5309 160.542 28.1149 160.542 28.7796C160.542 29.4946 160.356 30.1189 159.983 30.6527C159.61 31.1864 159.112 31.5791 158.487 31.8309L159.681 34.4139C159.782 34.6254 159.892 34.7815 160.013 34.8822C160.134 34.9728 160.3 35.0181 160.512 35.0181H161.146V36H160.361C159.978 36 159.651 35.9043 159.379 35.713C159.107 35.5217 158.88 35.2498 158.699 34.8973L157.4 32.0877C157.279 32.0978 157.153 32.1078 157.022 32.1179C156.901 32.128 156.781 32.133 156.66 32.133H153.518V36H152.43ZM153.518 31.1663H156.841C157.324 31.1663 157.762 31.0756 158.155 30.8944C158.548 30.703 158.86 30.4311 159.092 30.0787C159.333 29.7161 159.454 29.2831 159.454 28.7796C159.454 28.2861 159.333 27.8582 159.092 27.4956C158.86 27.1331 158.548 26.8612 158.155 26.6799C157.772 26.4886 157.35 26.3929 156.886 26.3929H153.518V31.1663ZM162.216 36V35.0333H164.315V26.3929H162.216V25.4262H167.502V26.3929H165.403V35.0333H167.502V36H162.216ZM176.537 36.1964C176.013 36.1964 175.545 36.0755 175.132 35.8338C174.719 35.5821 174.397 35.2447 174.166 34.8218C173.934 34.3888 173.818 33.9003 173.818 33.3565V27.9035C173.818 27.5812 173.743 27.2942 173.592 27.0425C173.44 26.7806 173.239 26.5792 172.987 26.4382C172.746 26.2872 172.474 26.2117 172.172 26.2117C171.869 26.2117 171.593 26.2872 171.341 26.4382C171.089 26.5792 170.888 26.7806 170.737 27.0425C170.586 27.2942 170.51 27.5812 170.51 27.9035V36H169.422V28.0696C169.422 27.5158 169.538 27.0274 169.77 26.6044C170.001 26.1814 170.324 25.8491 170.737 25.6074C171.149 25.3557 171.628 25.2298 172.172 25.2298C172.705 25.2298 173.179 25.3557 173.592 25.6074C174.004 25.8491 174.327 26.1814 174.558 26.6044C174.8 27.0274 174.921 27.5158 174.921 28.0696V33.5227C174.921 33.855 174.996 34.1471 175.147 34.3988C175.298 34.6506 175.495 34.852 175.736 35.003C175.978 35.144 176.245 35.2145 176.537 35.2145C176.829 35.2145 177.096 35.144 177.338 35.003C177.579 34.852 177.771 34.6506 177.912 34.3988C178.053 34.1471 178.123 33.855 178.123 33.5227V25.4262H179.211V33.3565C179.211 33.9003 179.1 34.3888 178.878 34.8218C178.657 35.2447 178.345 35.5821 177.942 35.8338C177.539 36.0755 177.071 36.1964 176.537 36.1964ZM183.196 36C182.562 36 182.058 35.8036 181.686 35.4109C181.323 35.0181 181.142 34.5499 181.142 34.0061C181.142 33.6234 181.223 33.3012 181.384 33.0393C181.555 32.7775 181.822 32.5056 182.184 32.2236L186.988 28.4171C187.24 28.2358 187.411 28.0696 187.501 27.9186C187.592 27.7575 187.637 27.5661 187.637 27.3446C187.637 27.1935 187.597 27.0475 187.517 26.9065C187.436 26.7555 187.325 26.6346 187.184 26.544C187.043 26.4433 186.882 26.3929 186.701 26.3929H181.505L181.52 25.4262H186.746C187.179 25.4262 187.547 25.5168 187.849 25.6981C188.151 25.8793 188.383 26.116 188.544 26.408C188.705 26.7001 188.785 27.0223 188.785 27.3748C188.785 27.7776 188.695 28.125 188.513 28.4171C188.332 28.699 188.065 28.9709 187.713 29.2328L182.97 33.0091C182.789 33.14 182.648 33.2558 182.547 33.3565C182.446 33.4572 182.371 33.563 182.32 33.6738C182.28 33.7745 182.26 33.9054 182.26 34.0665C182.26 34.2075 182.3 34.3535 182.381 34.5046C182.471 34.6556 182.592 34.7815 182.743 34.8822C182.904 34.9829 183.086 35.0333 183.287 35.0333H188.755V36H183.196ZM188.913 36L192.599 26.3476C192.75 25.9549 192.941 25.6729 193.173 25.5017C193.414 25.3204 193.696 25.2298 194.019 25.2298C194.351 25.2298 194.638 25.3154 194.88 25.4866C195.121 25.6578 195.313 25.9398 195.454 26.3325L199.17 36H197.976L196.919 33.2206H191.118L190.061 36H188.913ZM191.451 32.2538H196.587L194.532 26.7101C194.472 26.549 194.401 26.4231 194.321 26.3325C194.25 26.2419 194.155 26.1966 194.034 26.1966C193.903 26.1966 193.802 26.2419 193.732 26.3325C193.671 26.4231 193.606 26.549 193.535 26.7101L191.451 32.2538Z"
                fill="white"
              />
            </svg>

            <div className="footer_main_top_social">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="26"
                  viewBox="0 0 14 26"
                  fill="none"
                >
                  <path
                    d="M12.3183 14.3814L13.0015 9.92709H8.72787V7.03787C8.72787 5.81928 9.32498 4.63018 11.2391 4.63018H13.1822V0.838076C13.1822 0.838076 11.4187 0.537109 9.73281 0.537109C6.21309 0.537109 3.9125 2.67032 3.9125 6.53225V9.92709H0V14.3814H3.9125V25.1491C5.50786 25.3987 7.13251 25.3987 8.72787 25.1491V14.3814H12.3183Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="">
                <svg
                  width="25"
                  height="26"
                  viewBox="0 0 25 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.0665 9.39187C19.8027 10.5682 21.9296 11.2603 24.2268 11.2603V7.07055C23.792 7.07064 23.3584 7.02767 22.9331 6.94226V10.2402C20.6361 10.2402 18.5094 9.54808 16.7728 8.37184V16.9219C16.7728 21.1991 13.1145 24.6663 8.60207 24.6663C6.91838 24.6663 5.35345 24.1838 4.05347 23.3564C5.53718 24.7943 7.60634 25.6863 9.8955 25.6863C14.4082 25.6863 18.0667 22.2192 18.0667 17.9418V9.39187H18.0665ZM19.6624 5.16491C18.7751 4.24613 18.1925 3.05878 18.0665 1.74611V1.20721H16.8405C17.1491 2.87562 18.2017 4.301 19.6624 5.16491ZM6.90758 20.0742C6.41184 19.4581 6.14394 18.7045 6.14514 17.9296C6.14514 15.9733 7.81841 14.3872 9.88277 14.3872C10.2675 14.3871 10.6499 14.4429 11.0166 14.5532V10.2698C10.5881 10.2141 10.1556 10.1905 9.7234 10.1992V13.5332C9.35648 13.4229 8.97388 13.3669 8.58906 13.3672C6.5247 13.3672 4.85153 14.9532 4.85153 16.9097C4.85153 18.2931 5.68788 19.4908 6.90758 20.0742Z"
                    fill="white"
                  />
                  <path
                    d="M16.7727 8.37175C18.5093 9.54799 20.636 10.2401 22.933 10.2401V6.94217C21.6508 6.68331 20.5157 6.04824 19.6623 5.16491C18.2015 4.30091 17.149 2.87553 16.8404 1.20721H13.6201V17.9416C13.6128 19.8925 11.9424 21.4722 9.88247 21.4722C8.66859 21.4722 7.59018 20.9237 6.90719 20.0742C5.68759 19.4907 4.85123 18.293 4.85123 16.9098C4.85123 14.9535 6.52441 13.3673 8.58877 13.3673C8.98429 13.3673 9.36551 13.4257 9.7231 13.5332V10.1992C5.28994 10.2861 1.72461 13.7193 1.72461 17.9417C1.72461 20.0495 2.61246 21.9603 4.05345 23.3565C5.35343 24.1838 6.91836 24.6663 8.60205 24.6663C13.1146 24.6663 16.7727 21.1991 16.7727 16.9219V8.37175H16.7727Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="">
                <svg
                  width="29"
                  height="30"
                  viewBox="0 0 29 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.7358 0.760254H2.56883C2.01373 0.760254 1.48137 0.980766 1.08886 1.37328C0.696342 1.76579 0.47583 2.29815 0.47583 2.85325V27.0202C0.47583 27.5753 0.696342 28.1076 1.08886 28.5002C1.48137 28.8927 2.01373 29.1132 2.56883 29.1132H26.7358C27.2909 29.1132 27.8232 28.8927 28.2157 28.5002C28.6082 28.1076 28.8288 27.5753 28.8288 27.0202V2.85325C28.8288 2.29815 28.6082 1.76579 28.2157 1.37328C27.8232 0.980766 27.2909 0.760254 26.7358 0.760254ZM8.92658 24.9134H4.66379V11.3729H8.92658V24.9134ZM6.79223 9.4965C6.30869 9.49378 5.8368 9.34788 5.4361 9.07722C5.0354 8.80655 4.72386 8.42326 4.54079 7.97571C4.35772 7.52815 4.31133 7.0364 4.40747 6.56251C4.50362 6.08862 4.73799 5.65382 5.081 5.313C5.42402 4.97218 5.86031 4.74061 6.33481 4.64751C6.80931 4.55441 7.30075 4.60396 7.74712 4.7899C8.19349 4.97584 8.57477 5.28983 8.84286 5.69226C9.11094 6.09469 9.25381 6.56751 9.25342 7.05106C9.25799 7.3748 9.19732 7.69614 9.07505 7.99593C8.95278 8.29572 8.7714 8.56782 8.54173 8.79603C8.31206 9.02423 8.0388 9.20385 7.73822 9.3242C7.43765 9.44454 7.11593 9.50314 6.79223 9.4965ZM24.6388 24.9252H20.378V17.5279C20.378 15.3463 19.4506 14.6729 18.2535 14.6729C16.9894 14.6729 15.749 15.6259 15.749 17.583V24.9252H11.4862V11.3828H15.5856V13.2592H15.6407C16.0522 12.4263 17.4935 11.0028 19.6928 11.0028C22.0713 11.0028 24.6408 12.4145 24.6408 16.5493L24.6388 24.9252Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2793 2.12482C11.6726 2.12482 11.2198 2.14062 9.80334 2.20503C8.38949 2.26984 7.42439 2.49362 6.58002 2.82205C5.70642 3.16123 4.9655 3.61503 4.22736 4.35343C3.48857 5.09169 3.03477 5.83262 2.69452 6.70581C2.36516 7.55046 2.14112 8.51595 2.07751 9.92914C2.01416 11.3458 1.99756 11.7986 1.99756 15.4055C1.99756 19.0124 2.0135 19.4636 2.07777 20.8802C2.14285 22.294 2.36663 23.2591 2.69479 24.1035C3.03424 24.9771 3.48804 25.718 4.22644 26.4561C4.96444 27.1949 5.70536 27.6498 6.57829 27.989C7.42333 28.3174 8.38856 28.5412 9.80215 28.606C11.2188 28.6704 11.6711 28.6862 15.2777 28.6862C18.8849 28.6862 19.3361 28.6704 20.7526 28.606C22.1665 28.5412 23.1326 28.3174 23.9777 27.989C24.8509 27.6498 25.5907 27.1949 26.3286 26.4561C27.0674 25.718 27.5211 24.9771 27.8614 24.1039C28.1879 23.2591 28.4121 22.2937 28.4785 20.8804C28.5421 19.4639 28.5587 19.0124 28.5587 15.4055C28.5587 11.7986 28.5421 11.346 28.4785 9.9294C28.4121 8.51555 28.1879 7.55059 27.8614 6.70621C27.5211 5.83262 27.0674 5.09169 26.3286 4.35343C25.5899 3.61476 24.8511 3.16097 23.9769 2.82218C23.1302 2.49362 22.1646 2.26971 20.7508 2.20503C19.3341 2.14062 18.8831 2.12482 15.2752 2.12482H15.2793ZM14.0879 4.51811C14.4416 4.51758 14.8361 4.51811 15.2793 4.51811C18.8254 4.51811 19.2456 4.53086 20.6459 4.59447C21.9407 4.6537 22.6435 4.87004 23.1117 5.05185C23.7315 5.2925 24.1733 5.58029 24.6379 6.04524C25.1027 6.51006 25.3903 6.9527 25.6316 7.5725C25.8135 8.03998 26.0301 8.74278 26.089 10.0376C26.1526 11.4377 26.1665 11.8581 26.1665 15.4025C26.1665 18.9468 26.1526 19.3674 26.089 20.7673C26.0298 22.0621 25.8135 22.7649 25.6316 23.2325C25.391 23.8523 25.1027 24.2937 24.6379 24.7582C24.173 25.223 23.7317 25.5107 23.1117 25.7515C22.644 25.9341 21.9407 26.1499 20.6459 26.2091C19.2458 26.2727 18.8254 26.2865 15.2793 26.2865C11.7331 26.2865 11.3128 26.2727 9.9129 26.2091C8.61805 26.1493 7.91524 25.933 7.4467 25.7512C6.82703 25.5104 6.38426 25.2228 5.91944 24.7579C5.45462 24.2931 5.16696 23.8515 4.92566 23.2315C4.74385 22.7639 4.52724 22.0611 4.46827 20.7662C4.40466 19.3662 4.39191 18.9457 4.39191 15.3991C4.39191 11.8527 4.40466 11.4344 4.46827 10.0343C4.52751 8.73947 4.74385 8.03666 4.92566 7.56852C5.16643 6.94871 5.45462 6.50607 5.91957 6.04125C6.38439 5.57643 6.82703 5.28864 7.44684 5.04747C7.91498 4.86486 8.61805 4.64905 9.9129 4.58956C11.138 4.53418 11.6128 4.51758 14.0879 4.51479V4.51811ZM22.3685 6.72321C21.4886 6.72321 20.7748 7.43638 20.7748 8.31635C20.7748 9.19618 21.4886 9.91001 22.3685 9.91001C23.2483 9.91001 23.9621 9.19618 23.9621 8.31635C23.9621 7.43651 23.2483 6.72321 22.3685 6.72321ZM15.2793 8.58528C11.5129 8.58528 8.45921 11.639 8.45921 15.4055C8.45921 19.172 11.5129 22.2243 15.2793 22.2243C19.0458 22.2243 22.0985 19.172 22.0985 15.4055C22.0985 11.6391 19.0458 8.58528 15.2793 8.58528ZM15.2793 10.9786C17.7241 10.9786 19.7063 12.9604 19.7063 15.4055C19.7063 17.8503 17.7241 19.8325 15.2793 19.8325C12.8344 19.8325 10.8525 17.8503 10.8525 15.4055C10.8525 12.9604 12.8344 10.9786 15.2793 10.9786Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a style={{ display: 'none' }} href="">
                <svg
                  width="28"
                  height="22"
                  viewBox="0 0 28 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6605 15.3625L12.6598 15.3629C11.7939 15.8608 10.7096 15.238 10.7096 14.2356V7.76588C10.7096 7.76578 10.7096 7.76567 10.7096 7.76556C10.7096 7.76512 10.7096 7.76467 10.7096 7.76423C10.7098 7.53643 10.7698 7.31265 10.8836 7.1153C10.9977 6.91747 11.1618 6.75316 11.3596 6.63891C11.5573 6.52466 11.7817 6.4645 12.01 6.46446C12.2384 6.46442 12.4627 6.52451 12.6605 6.63867C12.6605 6.63868 12.6605 6.63869 12.6605 6.63871L18.2641 9.87276L12.6605 15.3625ZM12.6605 15.3625L18.2641 12.1271M12.6605 15.3625L18.2641 12.1271M18.2641 12.1271C18.2643 12.127 18.2645 12.1269 18.2646 12.1268L18.2641 12.1271ZM22.2043 1.20821L22.2049 1.20826C23.2779 1.29039 24.2875 1.74826 25.0562 2.50132C25.8247 3.2542 26.3031 4.25391 26.4074 5.32466C26.4074 5.32492 26.4075 5.32519 26.4075 5.32545L26.4605 5.8882L26.56 7.09539C26.56 7.09603 26.5601 7.09667 26.5601 7.09731C26.6529 8.34752 26.7214 9.70534 26.7214 10.9999C26.7214 12.2945 26.6529 13.6524 26.5601 14.9026C26.5601 14.9032 26.56 14.9038 26.56 14.9045L26.4605 16.1114C26.4605 16.1119 26.4604 16.1124 26.4604 16.1129C26.4431 16.3063 26.426 16.4916 26.4077 16.6723L26.4075 16.6744C26.3033 17.7456 25.8247 18.7458 25.0557 19.4989C24.2868 20.252 23.2769 20.7097 22.2037 20.7916L22.2034 20.7916L21.1132 20.8754L21.1093 20.8757L19.9171 20.9578L19.9124 20.9581L18.6364 21.0337L17.3018 21.0975C17.3014 21.0975 17.3011 21.0975 17.3007 21.0976C16.1606 21.1471 15.0195 21.1727 13.8783 21.1744C12.737 21.1727 11.596 21.1471 10.4558 21.0976C10.4555 21.0975 10.4551 21.0975 10.4548 21.0975L9.12014 21.0337L7.84552 20.9581L7.84076 20.9578L6.64848 20.8757L6.64464 20.8754L5.55168 20.7916L5.55163 20.7916C4.47867 20.7095 3.46904 20.2516 2.70036 19.4985C1.93186 18.7457 1.4534 17.7459 1.34912 16.6752C1.34909 16.6749 1.34907 16.6747 1.34904 16.6744L1.29609 16.1118L1.19644 14.9027C1.19641 14.9023 1.19638 14.9019 1.19635 14.9016C1.09535 13.603 1.04159 12.3012 1.03516 10.9987C1.0352 9.70452 1.10368 8.3472 1.19642 7.09741L1.29619 5.88686C1.31341 5.69349 1.33051 5.5082 1.34883 5.32754L1.34884 5.32754L1.34904 5.32544C1.45313 4.25459 1.93146 3.25472 2.6999 2.50168C3.46834 1.74864 4.47768 1.29065 5.55043 1.20825L5.551 1.20821L6.64395 1.12301L7.84018 1.04193L9.11882 0.96617L10.4534 0.902359C10.4538 0.902343 10.4542 0.902328 10.4545 0.902312C11.5952 0.852792 12.7369 0.827162 13.8786 0.825439C15.0106 0.825446 16.173 0.854569 17.301 0.902324C17.3014 0.902344 17.3019 0.902363 17.3023 0.902382L18.6364 0.966169L19.9116 1.04179L19.9158 1.04206L21.1075 1.12282L21.1125 1.12318L22.2043 1.20821Z"
                    fill="white"
                    stroke="white"
                  />
                </svg>
              </a>
              <a href="">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8542 6.16925C12.5468 6.15384 12.2394 6.20109 11.9508 6.30812C11.6622 6.41515 11.3984 6.57973 11.1754 6.79187C10.9524 7.004 10.7748 7.25925 10.6534 7.54213C10.5321 7.825 10.4695 8.12959 10.4695 8.43739C10.4695 8.7452 10.5321 9.04978 10.6534 9.33266C10.7748 9.61553 10.9524 9.87079 11.1754 10.0829C11.3984 10.2951 11.6622 10.4596 11.9508 10.5667C12.2394 10.6737 12.5468 10.7209 12.8542 10.7055C13.1616 10.7209 13.4689 10.6737 13.7575 10.5667C14.0461 10.4596 14.3099 10.2951 14.533 10.0829C14.756 9.87079 14.9336 9.61553 15.0549 9.33266C15.1763 9.04978 15.2388 8.7452 15.2388 8.43739C15.2388 8.12959 15.1763 7.825 15.0549 7.54213C14.9336 7.25925 14.756 7.004 14.533 6.79187C14.3099 6.57973 14.0461 6.41515 13.7575 6.30812C13.4689 6.20109 13.1616 6.15384 12.8542 6.16925ZM21.9609 0.187256H3.74743C1.73826 0.187256 0.104736 1.82078 0.104736 3.82995V22.0434C0.104736 24.0526 1.73826 25.6861 3.74743 25.6861H21.9609C23.9701 25.6861 25.6036 24.0526 25.6036 22.0434V3.82995C25.6036 1.82078 23.9701 0.187256 21.9609 0.187256ZM12.8542 3.82426C14.0777 3.82426 15.251 4.31029 16.1162 5.17542C16.9813 6.04055 17.4673 7.21392 17.4673 8.43739C17.4673 9.66087 16.9813 10.8342 16.1162 11.6994C15.251 12.5645 14.0777 13.0505 12.8542 13.0505C11.6307 13.0505 10.4573 12.5645 9.5922 11.6994C8.72707 10.8342 8.24104 9.66087 8.24104 8.43739C8.24104 7.21392 8.72707 6.04055 9.5922 5.17542C10.4573 4.31029 11.6307 3.82426 12.8542 3.82426ZM16.2294 13.4034C17.1856 12.6521 17.9084 13.0904 18.1702 13.6083C18.6142 14.519 18.1076 14.9573 16.9465 15.7142C15.9732 16.3346 14.63 16.5794 13.7478 16.6705L14.4877 17.4047L17.2026 20.1196C18.193 21.1385 16.5766 22.7264 15.5748 21.7475C14.8918 21.0531 13.8958 20.057 12.8599 19.0211L10.1449 21.7475C9.13749 22.7264 7.52673 21.1214 8.52847 20.1196L9.23994 19.4082C9.83187 18.8162 10.5263 18.1162 11.2434 17.4047L11.9777 16.6705C11.1011 16.5794 9.74081 16.346 8.75614 15.7142C7.60072 14.9573 7.08847 14.5247 7.53811 13.6083C7.79993 13.0904 8.52278 12.6521 9.47899 13.4034C9.47899 13.4034 10.771 14.4279 12.8542 14.4279C14.9373 14.4279 16.2294 13.4034 16.2294 13.4034Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.00604 4.91253C7.66192 2.25489 11.2703 0.760376 15.0292 0.760376C18.7882 0.760376 22.3966 2.25489 25.0525 4.91253C27.7105 7.57017 29.2057 11.1785 29.2057 14.9368C29.2057 18.6952 27.7105 22.3035 25.0525 24.9611C22.3966 27.6188 18.7882 29.1133 15.0292 29.1133C11.2703 29.1133 7.66192 27.6188 5.00604 24.9611C2.34796 22.3035 0.852783 18.6952 0.852783 14.9368C0.85352 11.1769 2.34743 7.57123 5.00604 4.91253ZM15.5363 11.226C14.1585 11.7995 11.403 12.9866 7.26963 14.787C6.59846 15.0539 6.24626 15.3151 6.21525 15.5702C6.16071 16.0013 6.70057 16.1713 7.43413 16.4023C7.53475 16.434 7.639 16.4669 7.74587 16.5017C8.4702 16.7369 9.44483 17.0122 9.94987 17.0231C10.4106 17.0331 10.9223 16.8437 11.4871 16.4552C15.3502 13.8487 17.3416 12.5312 17.4678 12.5028C17.5564 12.4829 17.6783 12.4576 17.7602 12.5314C17.8444 12.6049 17.8355 12.7445 17.8267 12.7819C17.7744 13.0096 15.6618 14.9738 14.5624 15.9959C14.2168 16.3173 13.9713 16.5455 13.9215 16.5974C13.8102 16.713 13.6968 16.8223 13.5878 16.9274C12.9156 17.5754 12.4112 18.0615 13.6158 18.8552C14.1999 19.2399 14.6661 19.5575 15.132 19.8748C15.6327 20.2158 16.133 20.5566 16.7789 20.9803C16.9451 21.0892 17.1037 21.2023 17.2582 21.3124C17.8453 21.7309 18.3727 22.1069 19.025 22.0469C19.4038 22.0121 19.7959 21.6559 19.993 20.5936C20.4626 18.0828 21.3863 12.643 21.5989 10.4014C21.6189 10.2051 21.5945 9.9537 21.5768 9.84339C21.5568 9.73297 21.517 9.5757 21.3752 9.4594C21.2047 9.32152 20.9433 9.2925 20.8259 9.29438C20.292 9.30402 19.4747 9.58843 15.5363 11.226Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer_main_top_text">
            Hope you liked my portfolio website. Feel free to suggest
            improvements or just to chat.
          </div>

          <div className="footer_block_about_me_links">
            <LinkButton to="/utilities">Utilities</LinkButton>
            <LinkButton to="/legal">Legal</LinkButton>
          </div>
        </div>
      </div>
      <Button onClick={scrollToTop} border="#333" border_radius="100px">
        {t('footer.scroll_up')}
        <Icon
          type="arrow"
          rotate="-90"
          color="var(--theme_primary_color_black)"
          width="30px"
          height="30px"
        />
      </Button>

      <div className="footer_copyright">
        <Icon type="copyright" color="var(--theme_primary_color_black)" />
        &nbsp;&nbsp;2024 Copyright
        <span className="footer_copyright_light">&nbsp;by&nbsp;</span>
        Cristian Brinza
      </div>
    </div>
  );
};

export default Footer;