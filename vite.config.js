import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/socket.io': {
        target: 'http://103.52.115.175',
        changeOrigin: true,
        secure: false,
        ws: true  // Penting untuk WebSocket
      }
    }
  }
})