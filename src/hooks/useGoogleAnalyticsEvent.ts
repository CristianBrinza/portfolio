import { trackEvent } from '../utils/consent';

function useGoogleAnalyticsEvent(eventCategory: string) {
  const sendEvent = async (eventAction: string, eventLabel?: string) => {
    trackEvent(eventCategory, eventAction, eventLabel);
  };

  return sendEvent;
}

export default useGoogleAnalyticsEvent;
