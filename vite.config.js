import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 배포 경로를 현재 경로에 맞추기
  build: {
    outDir: 'dist', // 빌드 출력 디렉토리
    assetsDir: 'assets', // 정적 파일 디렉토리 설정
  },
});
