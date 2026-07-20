// src/components/Notification/Notification.tsx

import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNotification } from './NotificationContext'; // If you're using a notification context
import Icon from '../Icon'; // Adjust the import path as necessary
import './Notification.css';

interface NotificationProps {
  type?: 'info' | 'error' | 'success' | 'warning';
  children?: React.ReactNode;
  time?: number; // Time in milliseconds
  onClose?: () => void; // Added onClose prop
}

let nextNotificationId = 0;

const getStackMetrics = () => {
  if (window.innerWidth <= 480) {
    return { gap: 6, inset: 12 };
  }

  if (window.innerWidth <= 768) {
    return { gap: 8, inset: 16 };
  }

  return { gap: 10, inset: 30 };
};

const Notification: React.FC<NotificationProps> = ({
  children,
  type = 'info',
  time = 10000,
  onClose, // Added onClose prop
}) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [notificationId] = useState(() => ++nextNotificationId);
  const elementRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { addNotification, removeNotification, getNotificationOffset } =
    useNotification(); // If you're using a notification context

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!visible || !element) return;

    const updateHeight = () => {
      addNotification(notificationId, element.getBoundingClientRect().height);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [addNotification, notificationId, visible]);

  useEffect(() => {
    const id = notificationId;

    const timeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        removeNotification(id);
        if (onClose) onClose(); // Call onClose when notification is dismissed
      }, 1000);
    }, time - 1000);

    return () => {
      clearTimeout(timeout);
      removeNotification(id);
    };
  }, [notificationId, removeNotification, time, onClose]);

  useEffect(() => {
    if (!visible) return;

    const updatePosition = () => {
      const { gap, inset } = getStackMetrics();
      const offset = getNotificationOffset(notificationId, gap);
      if (elementRef.current) {
        elementRef.current.style.bottom = `calc(${inset + offset}px + env(safe-area-inset-bottom))`;
      }
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.visualViewport?.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.visualViewport?.removeEventListener('resize', updatePosition);
    };
  }, [visible, getNotificationOffset, notificationId]);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      removeNotification(notificationId);
      if (onClose) onClose(); // Call onClose when close button is clicked
    }, 1000);
  };

  const accentColor =
    type === 'error'
      ? '#e40523'
      : type === 'warning'
        ? '#d97812'
        : type === 'success'
          ? '#218b50'
          : '#1967d2';

  const iconTypeMap = {
    info: 'info',
    error: 'error',
    success: 'success',
    warning: 'warning',
  } as const;

  return (
    <>
      {visible && (
        <div
          ref={elementRef}
          className={`WebsiteWarning WebsiteWarning_${type} ${fadeOut ? 'fadeOut' : ''}`}
          style={
            {
              transition: 'bottom 240ms cubic-bezier(0.2, 0.7, 0.2, 1)',
              '--notification-accent': accentColor,
            } as CSSProperties
          }
        >
          <button
            aria-label={t('notification.close')}
            className="WebsiteWarning_close"
            onClick={handleClose}
            type="button"
          >
            <Icon type="close" color="var(--theme_primary_color_black)" />
          </button>
          <div className="WebsiteWarning_block">
            <div className="WebsiteWarning_block_icon">
              <Icon type={iconTypeMap[type]} color="#ffffff" />
            </div>
            <div className="WebsiteWarning_text">
              <span className="WebsiteWarning_type">
                {t(`notification.${type}`)}
              </span>
              <br />
              <span className="WebsiteWarning_text_gray">
                {children || '\u00A0'}
              </span>
            </div>
          </div>
          <div
            className="WebsiteWarning_fill"
            style={{
              animationDuration: `${time}ms`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default Notification;
