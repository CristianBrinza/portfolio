// OfflinePage.tsx
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Footer from '../components/Footer/Footer.tsx';
import styles from '../styles/Offline.module.css';
import Page from '../components/Page.tsx';
import Icon from '../components/Icon.tsx';
import {Link} from "react-router-dom";

export default function OfflinePage() {
    const [pageHeight, setPageHeight] = useState('calc(100vh - 160px)');

    useEffect(() => {
        // Update the height based on the actual viewport height for mobile devices
        const handleResize = () => {
            const vh = window.innerHeight * 0.01;
            setPageHeight(`calc(${vh * 100}px - 160px)`);
        };

        handleResize(); // Initial calculation
        window.addEventListener('resize', handleResize); // Recalculate on resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup
        };
    }, []);

    const breadcrumbItems = [
        { label: <Trans>navigation.home</Trans>, url: '/' },
        { label: 'Offline'},
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <Page
                className={styles.offline_page}
                gap="20px"
                style={{ minHeight: pageHeight }}
            >
                <div style={{ height: '100px', width: '100px' }}>
                    <Icon
                        type="offline"
                        size="100px"
                        color="var(--theme_primary_color_darkest_gray"
                    />
                </div>
                <h1>
                    You're Offline
                </h1>

                <div className={styles.offline_page_under}>
                    It looks like you're not connected to the internet.
                    <br />
                    <Link to="/">Go back to Home</Link>
                    .
                </div>
            </Page>
            <Footer />
        </>
    );
}
