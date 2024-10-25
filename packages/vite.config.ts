import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname)}/`,
    },
  },

  plugins: [
    Vue(),
    dts({
      outDir: ['dist/es', 'dist/lib'],
      tsconfigPath: './tsconfig.json',
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),
  ],

  build: {
    target: 'modules',
    outDir: 'es',
    minify: true,
    rollupOptions: {
      // 忽略打包vue文件
      external: ['vue'],
      input: ['index.ts'],
      output: [
        {
          // 打包格式
          format: 'es',
          dir: 'dist/es',
          // 打包后文件名
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModulesRoot: 'src',
          preserveModules: true,
          exports: 'named',
        },
        {
          // 打包格式
          format: 'cjs',
          dir: 'dist/lib',
          // 打包后文件名
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModulesRoot: 'src',
          preserveModules: true,
          exports: 'named',
        },
      ],
    },
    lib: {
      entry: 'index.ts',
    },
  },
})
