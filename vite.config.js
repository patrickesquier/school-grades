import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, 
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'cd2dd91d9b51.ngrok-free.app',
      'localhost'
    ]
  }
})
