// useGoogleAnalyticsEvent.ts
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

const TRACKING_ID = import.meta.env.VITE_GOOGLE_TRACKING_TAG; // Google Analytics tracking ID

function initializeGA() {
  if (!ReactGA.isInitialized && TRACKING_ID) {
    ReactGA.initialize(TRACKING_ID, { testMode: import.meta.env.DEV }); // Use test mode in development
  }
}

function useGoogleAnalyticsEvent(eventCategory: string) {
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Google Analytics once on the first call
  useEffect(() => {
    const consentGiven = localStorage.getItem('userConsent');
    if (consentGiven === 'granted') {
      initializeGA();
      setIsInitialized(true);
      ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }
  }, []);

  const sendEvent = async (eventAction: string, eventLabel?: string) => {
    if (isInitialized) {
      ReactGA.send({
        hitType: 'event',
        eventCategory,
        eventAction,
        eventLabel,
      });
    } else {
      console.warn('Google Analytics not initialized. Event not sent.');
    }
  };

  return sendEvent;
}

export default useGoogleAnalyticsEvent;
