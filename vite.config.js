import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  plugins: [
    vue(),
    EnvironmentPlugin({ VUE_APP_API_URL: 'https://localhost:50645/api/' })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
})