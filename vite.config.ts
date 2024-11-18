import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development or production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/files\//, /^\/images\//, /^\/json\//],
          runtimeCaching: [
            {
              urlPattern: /\.(?:js|css|html|png|svg|jpg|jpeg|pdf|json)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'assets-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true, // Enable PWA in development mode
        },
      }),
    ],
    server: {
      proxy: {
        '/backend-images': {
          target: env.VITE_BACKEND, // Use the environment variable
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/backend-images/, '/images'),
          secure: false, // Set to false if you're using self-signed certificates
        },
      },
    },
  };
});
