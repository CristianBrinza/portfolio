import React from 'react';

interface IconProps {
  type?: keyof typeof icons;
  size?: string;
  width?: string;
  height?: string;
  color?: string;
  rotate?: string;
}
const icons = {
  close: (
    <>
      <path
        d="M6 17.939L17.9992 5.93972"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 6.06055L17.9992 18.0598"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  light_mode: (
    <>
      <path
        d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 3L12 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 19L12 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 12H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 12H5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 6.41406L19.4142 4.99985"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 19.4141L6.41421 17.9998"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 5L6.41421 6.41421"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 18L19.4142 19.4142"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  dark_mode: (
    <>
      <path
        d="M9.58199 3.45117C8.58203 9.45117 12.0821 15.4512 20.5815 14.4512"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.58282 3.45117C2.08203 5.95117 2.31048 13.5304 5.58283 17.4512C9.05803 21.615 17.5828 22.4512 20.5823 14.4512"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  menu: (
    <>
      <path
        d="M6.5 7H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.5 12H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.5 17H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  back: (
    <>
      <path
        d="M7 11L1 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 1L1 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  copyright: (
    <>
      <g id="Group 5221">
        <path
          id="Ellipse 107"
          d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          id="Ellipse 108"
          d="M11.5892 6.645C10.949 5.94155 10.0261 5.5 9 5.5C7.067 5.5 5.5 7.067 5.5 9C5.5 10.933 7.067 12.5 9 12.5C10.1124 12.5 11.1035 11.9811 11.7446 11.1721"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </>
  ),
  arrow: (
    <>
      <path
        d="M9 7L15 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 17L15 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  lang: (
    <>
      <path
        d="M3.6 9H20.4M3.6 15H20.4M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4999 3C9.81525 5.69961 8.92212 8.81787 8.92212 12C8.92212 15.1821 9.81525 18.3004 11.4999 21M12.4999 3C14.1846 5.69961 15.0777 8.81787 15.0777 12C15.0777 15.1821 14.1846 18.3004 12.4999 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  info: (
    <path
      d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.521 8.904 12.713 8.712C12.905 8.52 13.0007 8.28267 13 8C12.9993 7.71733 12.9033 7.48 12.712 7.288C12.5207 7.096 12.2833 7 12 7C11.7167 7 11.4793 7.096 11.288 7.288C11.0967 7.48 11.0007 7.71733 11 8C10.9993 8.28267 11.0953 8.52033 11.288 8.713C11.4807 8.90567 11.718 9.00133 12 9ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
      fill="currentColor"
    />
  ),
  warning: (
    <>
      <path
        d="M4.47 20.9999H19.53C21.07 20.9999 22.03 19.3299 21.26 17.9999L13.73 4.98993C12.96 3.65993 11.04 3.65993 10.27 4.98993L2.74 17.9999C1.97 19.3299 2.93 20.9999 4.47 20.9999ZM12 13.9999C11.45 13.9999 11 13.5499 11 12.9999V10.9999C11 10.4499 11.45 9.99993 12 9.99993C12.55 9.99993 13 10.4499 13 10.9999V12.9999C13 13.5499 12.55 13.9999 12 13.9999ZM13 17.9999H11V15.9999H13V17.9999Z"
        fill="currentColor"
      />
    </>
  ),
  error: (
    <path
      d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.521 8.904 12.713 8.712C12.905 8.52 13.0007 8.28267 13 8C12.9993 7.71733 12.9033 7.48 12.712 7.288C12.5207 7.096 12.2833 7 12 7C11.7167 7 11.4793 7.096 11.288 7.288C11.0967 7.48 11.0007 7.71733 11 8C10.9993 8.28267 11.0953 8.52033 11.288 8.713C11.4807 8.90567 11.718 9.00133 12 9ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
      fill="currentColor"
    />
  ),
  copy: (
    <path
      d="M20.25 3.1875H8.25C8.10082 3.1875 7.95774 3.24676 7.85225 3.35225C7.74676 3.45774 7.6875 3.60082 7.6875 3.75V7.6875H3.75C3.60082 7.6875 3.45774 7.74676 3.35225 7.85225C3.24676 7.95774 3.1875 8.10082 3.1875 8.25V20.25C3.1875 20.3992 3.24676 20.5423 3.35225 20.6477C3.45774 20.7532 3.60082 20.8125 3.75 20.8125H15.75C15.8992 20.8125 16.0423 20.7532 16.1477 20.6477C16.2532 20.5423 16.3125 20.3992 16.3125 20.25V16.3125H20.25C20.3992 16.3125 20.5423 16.2532 20.6477 16.1477C20.7532 16.0423 20.8125 15.8992 20.8125 15.75V3.75C20.8125 3.60082 20.7532 3.45774 20.6477 3.35225C20.5423 3.24676 20.3992 3.1875 20.25 3.1875ZM15.1875 19.6875H4.3125V8.8125H15.1875V19.6875ZM19.6875 15.1875H16.3125V8.25C16.3125 8.10082 16.2532 7.95774 16.1477 7.85225C16.0423 7.74676 15.8992 7.6875 15.75 7.6875H8.8125V4.3125H19.6875V15.1875Z"
      fill="currentColor"
    />
  ),
  url: (
    <path
      d="M8.24943 15.75L15.7494 8.25004M5.59443 9.91504L4.00443 11.505C2.87859 12.6309 2.24609 14.1579 2.24609 15.75C2.24609 17.3422 2.87859 18.8692 4.00443 19.995C5.13027 21.1209 6.65725 21.7534 8.24943 21.7534C9.84161 21.7534 11.3686 21.1209 12.4944 19.995L14.0844 18.405M18.4044 14.085L19.9944 12.495C21.1203 11.3692 21.7528 9.84222 21.7528 8.25004C21.7528 6.65786 21.1203 5.13088 19.9944 4.00504C18.8686 2.8792 17.3416 2.2467 15.7494 2.2467C14.1572 2.2467 12.6303 2.8792 11.5044 4.00504L9.91443 5.59504"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  ),
  qr: (
    <path
      d="M3 11H11V3H3V11ZM5 5H9V9H5V5ZM3 21H11V13H3V21ZM5 15H9V19H5V15ZM13 3V11H21V3H13ZM19 9H15V5H19V9ZM13.01 13H15.01V15H13.01V13ZM15.01 15H17.01V17H15.01V15ZM13.01 17H15.01V19H13.01V17ZM17.01 17H19.01V19H17.01V17ZM19.01 19H21.01V21H19.01V19ZM15.01 19H17.01V21H15.01V19ZM17.01 13H19.01V15H17.01V13ZM19.01 15H21.01V17H19.01V15Z"
      fill="currentColor"
    />
  ),
  phone: (
    <path
      d="M20.25 3.1875H8.25C8.10082 3.1875 7.95774 3.24676 7.85225 3.35225C7.74676 3.45774 7.6875 3.60082 7.6875 3.75V7.6875H3.75C3.60082 7.6875 3.45774 7.74676 3.35225 7.85225C3.24676 7.95774 3.1875 8.10082 3.1875 8.25V20.25C3.1875 20.3992 3.24676 20.5423 3.35225 20.6477C3.45774 20.7532 3.60082 20.8125 3.75 20.8125H15.75C15.8992 20.8125 16.0423 20.7532 16.1477 20.6477C16.2532 20.5423 16.3125 20.3992 16.3125 20.25V16.3125H20.25C20.3992 16.3125 20.5423 16.2532 20.6477 16.1477C20.7532 16.0423 20.8125 15.8992 20.8125 15.75V3.75C20.8125 3.60082 20.7532 3.45774 20.6477 3.35225C20.5423 3.24676 20.3992 3.1875 20.25 3.1875ZM15.1875 19.6875H4.3125V8.8125H15.1875V19.6875ZM19.6875 15.1875H16.3125V8.25C16.3125 8.10082 16.2532 7.95774 16.1477 7.85225C16.0423 7.74676 15.8992 7.6875 15.75 7.6875H8.8125V4.3125H19.6875V15.1875Z"
      fill="currentColor"
    />
  ),
  email: (
    <path
      d="M20.25 3.1875H8.25C8.10082 3.1875 7.95774 3.24676 7.85225 3.35225C7.74676 3.45774 7.6875 3.60082 7.6875 3.75V7.6875H3.75C3.60082 7.6875 3.45774 7.74676 3.35225 7.85225C3.24676 7.95774 3.1875 8.10082 3.1875 8.25V20.25C3.1875 20.3992 3.24676 20.5423 3.35225 20.6477C3.45774 20.7532 3.60082 20.8125 3.75 20.8125H15.75C15.8992 20.8125 16.0423 20.7532 16.1477 20.6477C16.2532 20.5423 16.3125 20.3992 16.3125 20.25V16.3125H20.25C20.3992 16.3125 20.5423 16.2532 20.6477 16.1477C20.7532 16.0423 20.8125 15.8992 20.8125 15.75V3.75C20.8125 3.60082 20.7532 3.45774 20.6477 3.35225C20.5423 3.24676 20.3992 3.1875 20.25 3.1875ZM15.1875 19.6875H4.3125V8.8125H15.1875V19.6875ZM19.6875 15.1875H16.3125V8.25C16.3125 8.10082 16.2532 7.95774 16.1477 7.85225C16.0423 7.74676 15.8992 7.6875 15.75 7.6875H8.8125V4.3125H19.6875V15.1875Z"
      fill="currentColor"
    />
  ),
};

const Icon: React.FC<IconProps> = ({
  type,
  size,
  width,
  height,
  color = 'var(--theme_primary_color_black)',
  rotate = '0',
}) => {
  const finalWidth = width || size || '24px';
  const finalHeight = height || size || '24px';

  // Strip "px" from finalWidth and finalHeight if present
  //const numericWidth = finalWidth.replace('px', '');
  //const numericHeight = finalHeight.replace('px', '');

  return (
    <svg
      style={{ transform: `rotate(${rotate}deg)` }}
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
    >
      {type && icons[type]}
    </svg>
  );
};

export default Icon;