import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

export default defineConfig({
  // server: {
  //   port: 3001, // Change the port to 3000
  // },
  base: "https://cristianbrinza.github.io/portfolio/",
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'], // Optional: If you have global test setup file
  },
});
