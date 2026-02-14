import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-framer': ['framer-motion'],
          'vendor-utils': ['lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
    chunkSizeWarningLimit: 1200, // Increased limit for 3D heavy apps
  },
})
