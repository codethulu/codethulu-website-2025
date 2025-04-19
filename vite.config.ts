import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
// import autoprefixer from "autoprefixer";


// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  base: './',
})