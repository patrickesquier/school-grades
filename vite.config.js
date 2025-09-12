import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // permite acesso externo
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'cd2dd91d9b51.ngrok-free.app', // adicione a URL do ngrok
      'localhost'
    ]
  }
})
