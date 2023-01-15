import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import inject from '@rollup/plugin-inject'
import copy from 'rollup-plugin-copy'
const path = require('path')
const alias = require('./config/alias')
const extensions = require('./config/extensions')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias,
    extensions,
  },
  define: {
    global: 'globalThis',
  },
  plugins: [
    inject({ Buffer: ['buffer', 'Buffer'] }),
    reactRefresh(),
    copy({
      targets: [{ src: '../static', dest: '../static' }],
    }),
  ],
  root: path.resolve(__dirname, '../src'),
  server: {
    open: true,
    port: 9090,
  },
  build: {
    target: 'es2020',
    minify: false,
    commonjsOptions: {
      include: [],
    },
  },
  optimizeDeps: {
    disabled: false,
    esbuildOptions: {
      target: 'es2020',
    },
  },
})
