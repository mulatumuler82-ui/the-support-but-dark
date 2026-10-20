import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // local dev: forward /api/* to the Express server (cd server && npm run dev)
    proxy: { '/api': 'http://localhost:5000' },
  },
});
