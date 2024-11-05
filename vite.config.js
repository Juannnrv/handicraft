import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: 'client',
  base: './',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true
  }
})
