import * as path from 'path';

import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@translation': path.resolve(__dirname, './src/translation'),
      '@queries': path.resolve(__dirname, './src/services/queries'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    strictPort: true,
    port: 3200,
  },
  build: {
    rollupOptions: {
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'import.meta.env': JSON.stringify({
            VITE_REACT_APP_BASE_NAME: process.env.VITE_REACT_APP_BASE_NAME,
            VITE_REACT_APP_BASE_API_URL: process.env.VITE_REACT_APP_BASE_API_URL,
          }),
        }),
      ],
    },
  },
});
