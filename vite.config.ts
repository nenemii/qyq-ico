import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default defineConfig({
  base: '/qyq-ico/', // 这是你github仓库的名字
  plugins: [
    { 
      enforce: 'pre', 
      ...mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight]
      }) 
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ })
  ],
})