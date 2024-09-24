//components/Notification.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNotification } from './NotificationContext';
import Icon from '../Icon.tsx';
import './Notification.css';

interface NotificationProps {
  type?: 'info' | 'error' | 'success' | 'warning';
  children?: React.ReactNode;
  time?: number; // Time in milliseconds
}

const Notification: React.FC<NotificationProps> = ({
  children,
  type = 'info',
  time = 10000,
}) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const idRef = useRef<number>(Date.now());
  const elementRef = useRef<HTMLDivElement>(null);
  const { addNotification, removeNotification, getNotificationOffset } =
    useNotification();

  useEffect(() => {
    const id = idRef.current;
    const height = elementRef.current?.offsetHeight || 0;

    addNotification(id, height);

    const timeout = setTimeout(() => {
      setFadeOut(true); // Trigger fade out
      setTimeout(() => {
        setVisible(false); // Hide after fade out
        removeNotification(id);
      }, 1000); // Delay matches fadeOut duration
    }, time - 1000); // Start fading out 1 second before the total time

    return () => {
      clearTimeout(timeout);
      removeNotification(id);
    };
  }, [addNotification, removeNotification, time]); // Add `time` to the dependency array

  useEffect(() => {
    if (!visible) return;

    const updatePosition = () => {
      const offset = getNotificationOffset(idRef.current);
      if (elementRef.current) {
        elementRef.current.style.bottom = `${30 + offset}px`;
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
      const id = idRef.current;
      removeNotification(id);
    }, 1000);
  };

  const iconColor = type === 'info' ? 'var(--costume_info_loading_notification)' : '#ffffff';
  const textColor = type === 'info' ? '#222222' : '#ffffff';
  const bgColor =
    type === 'error'
      ? '#EA5F51'
      : type === 'warning'
        ? '#EA8B3F'
        : type === 'success'
          ? '#4DD181'
          : 'var(--costume_info_notification)';
  const borderColor =
    type === 'error'
      ? '#EA5F51'
      : type === 'warning'
        ? '#EA8B3F'
        : type === 'success'
          ? '#4DD181'
          : 'var(--costume_info_notification)';

  const iconTypeMap = {
    info: 'info',
    error: 'error',
    success: 'info',
    warning: 'warning',
  } as const;

  return (
    <>
      {visible && (
        <div
          ref={elementRef}
          className={`WebsiteWarning WebsiteWarning_${type} ${fadeOut ? 'fadeOut' : ''}`}
          style={{
            transition: 'bottom 1s ease-in-out', // Smooth transition for position
            background: `${bgColor}`,
            borderColor: `${borderColor}`,
          }}
        >
          <div className="WebsiteWarning_close" onClick={handleClose}>
            <Icon type="close" color={iconColor} />
          </div>
          <div className="WebsiteWarning_block">
            <div className="WebsiteWarning_block_icon">
              <Icon type={iconTypeMap[type]} color={iconColor} />
            </div>
            <div className="WebsiteWarning_text">
              <span
                className="WebsiteWarning_type"
                style={{ color: `${textColor}` }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
              </span>
              <br />
              <span
                className="WebsiteWarning_text_gray"
                style={{ color: `${textColor}` }}
              >
                {children || '\u00A0'}
              </span>
            </div>
          </div>
          <div
            className="WebsiteWarning_fill"
            style={{
              animationDuration: `${time}ms`, // Set animation duration here
              background: `${textColor}`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default Notification;
