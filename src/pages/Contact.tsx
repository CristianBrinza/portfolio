// src/pages/About.tsx
import React from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next'; // Import Trans component

export default function Contact() {
    const breadcrumbItems = [
        { label: <Trans>navigation.home</Trans>, url: '/' },
        { label: <Trans>navigation.about_page</Trans> },

    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems}/>
            <div className="main">
                <h1>Contact</h1>
            </div>
        </>
    );
}

