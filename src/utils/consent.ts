import ReactGA from 'react-ga4';

export type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
};

type StoredConsentPreferences = ConsentPreferences & {
  necessary: true;
  updatedAt: string;
  version: 2;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const CONSENT_STORAGE_KEY = 'portfolioCookieConsentPreferences';
export const CONSENT_CHANGED_EVENT = 'portfolio:consent-changed';
export const OPEN_CONSENT_SETTINGS_EVENT = 'portfolio:open-consent-settings';

const LEGACY_CONSENT_STORAGE_KEY = 'userConsent';
const TRACKING_ID = import.meta.env.VITE_GOOGLE_TRACKING_TAG;
const GTM_ID = import.meta.env.VITE_GTM_ID;

let defaultConsentConfigured = false;
let analyticsInitialized = false;
let tagManagerInitialized = false;

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }
}

function applyDefaultConsent() {
  if (defaultConsentConfigured) return;

  ensureDataLayer();
  window.gtag('consent', 'default', {
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  });
  defaultConsentConfigured = true;
}

export function getConsentPreferences(): StoredConsentPreferences | null {
  const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as Partial<StoredConsentPreferences>;
    if (
      parsed.version === 2 &&
      parsed.necessary === true &&
      typeof parsed.analytics === 'boolean' &&
      typeof parsed.marketing === 'boolean'
    ) {
      return {
        version: 2,
        necessary: true,
        analytics: parsed.analytics,
        marketing: parsed.marketing,
        updatedAt:
          typeof parsed.updatedAt === 'string'
            ? parsed.updatedAt
            : new Date().toISOString(),
      };
    }
  } catch {
    // A malformed value is not a valid consent choice.
  }

  localStorage.removeItem(CONSENT_STORAGE_KEY);
  return null;
}

function updateGoogleConsent(preferences: ConsentPreferences) {
  const analytics = preferences.analytics ? 'granted' : 'denied';
  const marketing = preferences.marketing ? 'granted' : 'denied';

  applyDefaultConsent();
  window.gtag('consent', 'update', {
    ad_personalization: marketing,
    ad_storage: marketing,
    ad_user_data: marketing,
    analytics_storage: analytics,
  });
}

function initializeAnalytics(preferences: ConsentPreferences) {
  if (!TRACKING_ID || analyticsInitialized || !preferences.analytics) return;

  ReactGA.initialize(TRACKING_ID, {
    testMode: import.meta.env.DEV,
    gtagOptions: {
      anonymize_ip: true,
      allow_ad_personalization_signals: preferences.marketing,
      allow_google_signals: preferences.marketing,
      send_page_view: false,
    },
  });
  analyticsInitialized = true;
}

function initializeTagManager(preferences: ConsentPreferences) {
  if (!GTM_ID || tagManagerInitialized || !preferences.marketing) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  script.dataset.consentManaged = 'true';
  document.head.appendChild(script);

  window.dataLayer.push({
    event: 'gtm.js',
    'gtm.start': Date.now(),
  });
  tagManagerInitialized = true;
}

function clearGoogleAnalyticsCookies() {
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0]?.trim();
    if (!name || !/^(_ga|_gid|_gat)/.test(name)) return;

    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}; SameSite=Lax`;
  });
}

function activateConsentedServices(preferences: ConsentPreferences) {
  initializeAnalytics(preferences);
  initializeTagManager(preferences);
}

export function initializeConsentMode() {
  applyDefaultConsent();
  const savedPreferences = getConsentPreferences();
  if (!savedPreferences) return;

  updateGoogleConsent(savedPreferences);
  activateConsentedServices(savedPreferences);
}

export function saveConsentPreferences(preferences: ConsentPreferences) {
  const storedPreferences: StoredConsentPreferences = {
    version: 2,
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(storedPreferences));
  localStorage.setItem(
    LEGACY_CONSENT_STORAGE_KEY,
    preferences.analytics ? 'granted' : 'denied'
  );

  updateGoogleConsent(preferences);
  activateConsentedServices(preferences);

  if (!preferences.analytics) {
    clearGoogleAnalyticsCookies();
  }

  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGED_EVENT, { detail: storedPreferences })
  );
}

export function trackPageview(path: string, title?: string) {
  const preferences = getConsentPreferences();
  if (!preferences?.analytics || !TRACKING_ID) return;

  initializeAnalytics(preferences);
  ReactGA.send({ hitType: 'pageview', page: path, title });
}

export function trackEvent(
  eventCategory: string,
  eventAction: string,
  eventLabel?: string
) {
  const preferences = getConsentPreferences();
  if (!preferences?.analytics || !TRACKING_ID) return;

  initializeAnalytics(preferences);
  ReactGA.send({
    hitType: 'event',
    eventCategory,
    eventAction,
    eventLabel,
  });
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_SETTINGS_EVENT));
}
