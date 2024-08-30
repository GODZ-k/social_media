import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@mui/icons-material'],
  },
  plugins: [react()],
  server:{
    port:5173,
    // get rid of the CORS error
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        changeOrigin:true,
        secure:false
      }
    }
  }
})
