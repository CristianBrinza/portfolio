import React, { useState, useEffect } from "react";
import "./ConsentBanner.css";
import Button from '../Button.tsx';
import ReactGA from 'react-ga4';

const ConsentBanner: React.FC = () => {
    const [showBanner, setShowBanner] = useState<boolean>(false);

    useEffect(() => {
        const consentGiven = localStorage.getItem("userConsent");
        if (!consentGiven) {
            setShowBanner(true); // Show banner if no consent has been given
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('userConsent', 'granted');

        // Initialize GA without consentMode, and send a pageview manually
        ReactGA.initialize(import.meta.env.VITE_GOOGLE_TRACKING_TAG);
        ReactGA.gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted',
        });
        ReactGA.send('pageview'); // Send an initial pageview event after consent is granted

        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem('userConsent', 'denied');

        // Initialize GA and set consent as denied
        ReactGA.initialize(import.meta.env.VITE_GOOGLE_TRACKING_TAG);
        ReactGA.gtag('consent', 'update', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
        });

        setShowBanner(false);
    };

    return showBanner ? (
        <div id="bannerStyles">
            <p>This website uses cookies to improve your experience.</p>
            <div id="bannerStyles_buttons">
                <Button onClick={handleDecline}>
                    Decline
                </Button>
                <Button
                    onClick={handleAccept}
                    color="#ffffff"
                    hover_bgcolor="#8E001D"
                    bgcolor="#E40523"
                    hover_color="#ffffff"
                >
                    Accept
                </Button>
            </div>
        </div>
    ) : null;
};

export default ConsentBanner;
