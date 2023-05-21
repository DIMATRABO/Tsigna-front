import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), viteTsConfigPaths()],
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the value to your desired limit
  },
})
