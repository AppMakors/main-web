import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/main-web/",
  server: {
    host: true, // or use '0.0.0.0' to listen on all network interfaces
    port: 5173, // Optional: specify the port, default is 5173
  },
})
