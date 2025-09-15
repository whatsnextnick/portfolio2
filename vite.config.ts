import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176,
    host: '0.0.0.0',
    strictPort: false,
    // WSL specific configurations for better HMR
    watch: {
      usePolling: true,
      interval: 300,
      binaryInterval: 1000,
      ignored: ['**/node_modules/**', '**/.git/**']
    },
    hmr: {
      overlay: true,
      clientPort: undefined // Let Vite auto-detect
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5176',
        changeOrigin: true
      }
    }
  },
  // Optimize for WSL file system
  optimizeDeps: {
    exclude: ['fsevents']
  },
  // Improve build performance in WSL
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      }
    }
  }
})