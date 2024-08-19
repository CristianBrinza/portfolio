// components/Notification.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNotification } from './NotificationContext';
import Icon from '../Icon.tsx';
import './Notification.css';

interface NotificationProps {
  type?: 'info' | 'error' | 'success';
  children?: React.ReactNode;
}

const Notification: React.FC<NotificationProps> = ({ children, type = 'info' }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const idRef = useRef<number>(Date.now());
  const { addNotification, removeNotification, getNotificationOffset } = useNotification();

  useEffect(() => {
    const id = idRef.current;
    addNotification(id);

    const timeout = setTimeout(() => {
      setFadeOut(true); // Trigger fade out
      setTimeout(() => {
        setVisible(false); // Hide after fade out
        removeNotification(id);
      }, 1000); // Delay matches fadeOut duration
    }, 11000); // Start fading out after 9 seconds

    return () => {
      clearTimeout(timeout);
      removeNotification(id);
    };
  }, [addNotification, removeNotification]);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      const id = idRef.current;
      removeNotification(id);
    }, 1000);
  };

  const iconColor = type === 'info' ? '#222222' : '#ffffff';
  const offset = getNotificationOffset(idRef.current);

  return (
      <>
        {visible && (
            <div
                className={`WebsiteWarning WebsiteWarning_${type} ${fadeOut ? 'fadeOut' : ''}`}
                style={{ bottom: `${30 + offset}px` }}
            >
              <div className="WebsiteWarning_close" onClick={handleClose}>
                <Icon type="close" stroke="var(--primary)" />
              </div>
              <div className="WebsiteWarning_block">
                <Icon type={type} color={iconColor} />
                <div className="WebsiteWarning_text">
                  <span className="WebsiteWarning_type">{type.toUpperCase()}</span>
                  <br />
                  <span className="WebsiteWarning_text_gray">
                {children || '\u00A0'}
              </span>
                </div>
              </div>
              <div className="WebsiteWarning_fill" />
            </div>
        )}
      </>
  );
};

export default Notification;
