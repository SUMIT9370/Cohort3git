import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // <- this makes it work in WSL or weird file systems
    },
    port: 5173,
    open: true,
  },
})
