import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@mui/icons-material'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    port:5173,
    // get rid of the CORS error
    proxy:{
      "/api":{
        // target:"http://localhost:3000",
        target:"social-media-s7t3.vercel.app",
        changeOrigin:true,
        secure:false
      }
    }
  }
})
