import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

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
    VueJsx(),
    dts({
      entryRoot: './src',
      outDir: ['../naive-ui-next/es', '../naive-ui-next/lib'],
      tsconfigPath: '../../tsconfig.json',
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),
  ],

  build: {
    target: 'modules',
    outDir: 'es',
    minify: true,
    sourcemap: true,
    rollupOptions: {
      // 忽略打包vue文件
      external: [...Object.keys((pkg as any).dependencies || {})],
      input: ['src/index.ts'],
      output: [
        {
          format: 'es',
          dir: '../naive-ui-next/es',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: './src',
          entryFileNames: '[name].mjs',
        },
        {
          format: 'cjs',
          dir: '../naive-ui-next/lib',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: './src',
          entryFileNames: '[name].js',
        },
      ],
    },
    lib: {
      entry: './src/index.ts',
      name: 'naive-ui-next',
    },
  },
})
