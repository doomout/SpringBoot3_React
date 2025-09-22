import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', 
    //css: true, // ✅ Vitest가 CSS import 허용
    setupFiles: ['./src/setupTests.ts'],
  },
})
