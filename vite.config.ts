import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default defineConfig({
  base: '/', // 绑定了自定义顶级域名后，这里必须改成根路径
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