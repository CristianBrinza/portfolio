/// <reference types="vite/client" />

/// <reference types="vite-plugin-pwa/client" />

declare module 'virtual:pwa-register' {
    export function registerSW(options?: {
        onNeedRefresh?: () => void;
        onOfflineReady?: () => void;
    }): () => void;
}
