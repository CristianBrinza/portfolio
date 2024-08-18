// src/hocs/withTranslation.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export function withTranslation<T>(Component: React.ComponentType<T>) {
    return function WrappedComponent(props: T) {
        const { t, i18n } = useTranslation();
        return <Component {...props} t={t} i18n={i18n} />;
    };
}
