// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

const standaloneRoutes = ["/app", "/another-app-route"]; // Define standalone routes

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/files\//, /^\/images\//, /^\/json\//],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|svg|jpg|jpeg|webp|gif|pdf)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
            },
          },
        ],
      },
      manifest: {
        name: "Cristian Brinza's Portfolio",
        short_name: "CB Portfolio",
        description:
          "Cristian Brinza's software engineering, full-stack development and design portfolio.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/app/", // Set the default standalone route
        icons: [
          {
            src: "/images/app/icon_logo_app_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/app/icon_logo_app_512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/images/app/icon_logo_app_maskable.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (standaloneRoutes.some((route) => id.includes(route))) {
            return "standalone";
          }
        },
      },
    },
  },
});
