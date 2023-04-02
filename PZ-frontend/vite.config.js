import { defineConfig } from 'vite'
import cssModules from 'postcss-modules';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssModules()
  ],
})
