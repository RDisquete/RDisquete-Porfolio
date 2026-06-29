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
        // Inyectamos solo la variable necesaria para evitar riesgos de seguridad
        define: {
            __GA_ID__: JSON.stringify(env.VITE_GOOGLE_ANALYTICS_ID || '')
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom', 'react-router-dom'],
                        framer: ['framer-motion'],
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
