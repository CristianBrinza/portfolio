// src/components/Notification/Notification.tsx

import React, { CSSProperties, useEffect, useRef, useState } from 'react';
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

const Notification: React.FC<NotificationProps> = ({
  children,
  type = 'info',
  time = 10000,
  onClose, // Added onClose prop
}) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const idRef = useRef<number>(Date.now());
  const elementRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { addNotification, removeNotification, getNotificationOffset } =
    useNotification(); // If you're using a notification context

  useEffect(() => {
    const id = idRef.current;
    const height = elementRef.current?.offsetHeight || 0;

    addNotification(id, height);

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
  }, [addNotification, removeNotification, time, onClose]);

  useEffect(() => {
    if (!visible) return;

    const updatePosition = () => {
      const offset = getNotificationOffset(idRef.current);
      if (elementRef.current) {
        const viewportInset = window.innerWidth <= 480 ? 16 : 30;
        elementRef.current.style.bottom = `${viewportInset + offset}px`;
      }
    };

    updatePosition();

    const interval = setInterval(updatePosition, 100);

    return () => clearInterval(interval);
  }, [visible, getNotificationOffset]);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      removeNotification(idRef.current);
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
              transition: 'bottom 1s ease-in-out',
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
