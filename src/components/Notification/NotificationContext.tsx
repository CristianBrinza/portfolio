// components/NotificationContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

interface NotificationContextProps {
  addNotification: (id: number, height: number) => void;
  removeNotification: (id: number) => void;
  getNotificationOffset: (id: number) => number;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<
    { id: number; height: number }[]
  >([]);

  const addNotification = useCallback((id: number, height: number) => {
    setNotifications(prev => [...prev, { id, height }]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const getNotificationOffset = useCallback(
    (id: number) => {
      const index = notifications.findIndex(n => n.id === id);
      if (index === -1) return 0;
      return notifications
        .slice(0, index)
        .reduce((acc, curr) => acc + curr.height + 10, 0); // 10px gap
    },
    [notifications]
  );

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification, getNotificationOffset }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};
