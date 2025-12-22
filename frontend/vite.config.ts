import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({mode}) => {
  // Load environment variables from the appropriate .env file (e.g., .env.development)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT, 10) || 5174,
      proxy: {
        '/api': {
          target: env?.VITE_API_URL ?? 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});
