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
      workbox: {
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/files\//, /^\/images\//, /^\/json\//],
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|html|png|svg|jpg|jpeg|pdf|json)$/,
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
        name: "CB",
        short_name: "CB",
        description: "Cristian Brinza's portfolio",
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
        ],
      },
      devOptions: {
        enabled: true, // Enable PWA in development mode
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
