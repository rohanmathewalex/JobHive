import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist', // ✅ Ensures Netlify finds the build
    rollupOptions: {
      external: [], // ✅ Remove react-router-dom from external to avoid errors
    },
  },
  resolve: {
    alias: {
      "react-router-dom": "/node_modules/react-router-dom" // ✅ Ensures correct path resolution
    }
  },
  base: '/', // ✅ Important for Netlify routing
});
