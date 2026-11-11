/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carga las variables de entorno del directorio raíz
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          // Fallback a cadena vacía para evitar errores de renderizado
          const id = env.VITE_GOOGLE_ANALYTICS_ID || '';
          return html.replace(/%VITE_GOOGLE_ANALYTICS_ID%/g, id);
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return undefined;
            if (
              id.includes('framer-motion') ||
              id.includes('motion-dom') ||
              id.includes('motion-utils')
            ) {
              return 'framer';
            }
            if (
              id.includes('/react/') ||
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('scheduler')
            ) {
              return 'vendor';
            }
            return undefined;
          },
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  };
});