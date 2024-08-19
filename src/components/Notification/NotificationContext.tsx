// components/NotificationContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

interface NotificationContextProps {
    addNotification: (id: number) => void;
    removeNotification: (id: number) => void;
    getNotificationOffset: (id: number) => number;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<number[]>([]);

    const addNotification = useCallback((id: number) => {
        setNotifications((prev) => [...prev, id]);
    }, []);

    const removeNotification = useCallback((id: number) => {
        setNotifications((prev) => prev.filter((n) => n !== id));
    }, []);

    const getNotificationOffset = useCallback(
        (id: number) => {
            const index = notifications.indexOf(id);
            return index * 10; // 10px offset per notification
        },
        [notifications]
    );

    return (
        <NotificationContext.Provider value={{ addNotification, removeNotification, getNotificationOffset }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
