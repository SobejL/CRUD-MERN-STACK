import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/posts' : 'http://localhost:3000',
      '/users' : 'http://localhost:3000',
      '/makePost' : 'http://localhost:3000',
      '/updatePost' : 'http://localhost:3000'
    }
  },
  plugins: [react()],
})
