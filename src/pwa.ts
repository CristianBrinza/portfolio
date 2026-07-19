import { registerSW } from 'virtual:pwa-register';

const UPDATE_INTERVAL_MS = 60 * 60 * 1000;
const DEV_CACHE_PREFIXES = ['workbox-precache', 'assets-cache'];
const DEV_RELOAD_KEY = 'portfolio-pwa-dev-cleanup-reload';

async function disablePWAInDevelopment() {
  if (!('serviceWorker' in navigator)) return;

  const hadController = navigator.serviceWorker.controller !== null;
  const registrations = await navigator.serviceWorker.getRegistrations();

  await Promise.all(
    registrations.map(registration => registration.unregister())
  );

  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter(cacheName =>
          DEV_CACHE_PREFIXES.some(prefix => cacheName.startsWith(prefix))
        )
        .map(cacheName => caches.delete(cacheName))
    );
  }

  if (hadController && sessionStorage.getItem(DEV_RELOAD_KEY) !== '1') {
    sessionStorage.setItem(DEV_RELOAD_KEY, '1');
    window.location.reload();
    return;
  }

  sessionStorage.removeItem(DEV_RELOAD_KEY);
}

function registerProductionPWA() {
  registerSW({
    immediate: true,
    onRegisteredSW(_serviceWorkerUrl, registration) {
      if (!registration) return;

      const checkForUpdate = () => {
        if (!navigator.onLine) return;

        registration.update().catch((error: unknown) => {
          console.warn('Unable to check for a PWA update.', error);
        });
      };

      checkForUpdate();
      window.setInterval(checkForUpdate, UPDATE_INTERVAL_MS);
      window.addEventListener('online', checkForUpdate);
      window.addEventListener('pageshow', checkForUpdate);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') checkForUpdate();
      });
    },
    onRegisterError(error) {
      console.error('Unable to register the PWA service worker.', error);
    },
  });
}

export function initializePWA() {
  if (import.meta.env.DEV) {
    disablePWAInDevelopment().catch((error: unknown) => {
      console.warn('Unable to remove development PWA caches.', error);
    });
    return;
  }

  registerProductionPWA();
}
