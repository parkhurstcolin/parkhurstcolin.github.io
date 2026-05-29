import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves a project site at https://<user>.github.io/Portfolio/
  // so the app's assets must be referenced under that sub-path.
  // (If we later use a custom domain or a <user>.github.io repo, change this back to '/'.)
  base: '/Portfolio/',
})
