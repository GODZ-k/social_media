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
  build: {
    outDir: 'dist', // Explicitly set the output directory
  },
  server:{
    port:5173,
    // get rid of the CORS error
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        // target:"https://social-media-xa8r.onrender.com",
        changeOrigin:true,
        secure:false
      }
    }
  }
})
