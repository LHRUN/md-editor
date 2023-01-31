import { defineConfig } from 'vite'
import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import vitePluginImp from 'vite-plugin-imp'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    viteEslint({
      failOnError: false
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`
        }
      ]
    }),
    visualizer()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    rollupOptions: {
      manualChunks: {
        antd: ['antd'],
        markdown: [
          'markdown-it',
          'markdown-it-abbr',
          'markdown-it-deflist',
          'markdown-it-footnote',
          'markdown-it-mark',
          'markdown-it-sub',
          'markdown-it-sup',
          'markdown-it-task-lists'
        ],
        highlight: ['highlight.js']
      }
    }
  }
})
