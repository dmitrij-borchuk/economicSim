import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/atoms': fileURLToPath(new URL('./src/components/atoms', import.meta.url)),
      '@/molecules': fileURLToPath(new URL('./src/components/molecules', import.meta.url)),
      '@/organisms': fileURLToPath(new URL('./src/components/organisms', import.meta.url)),
      '@/templates': fileURLToPath(new URL('./src/components/templates', import.meta.url)),
      '@/pages': fileURLToPath(new URL('./src/components/pages', import.meta.url)),
      '@/libs': fileURLToPath(new URL('./src/libs', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
