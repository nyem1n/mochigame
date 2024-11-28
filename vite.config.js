import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 로컬 및 배포 환경 모두에서 올바르게 동작
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
