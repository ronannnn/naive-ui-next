import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { VitePWA } from 'vite-plugin-pwa'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    Vue(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    dts({
      outputDir: 'es',
      // 指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: './tsconfig.json',
    }),
    // 因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
    dts({
      outputDir: 'lib',
      tsConfigFilePath: './tsconfig.json',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [NaiveUiResolver()],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA(),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools(),
  ],

  build: {
    chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    outDir: 'es',
    rollupOptions: {
      // 忽略打包vue文件
      external: ['vue'],
      input: ['src/index.ts'],
      output: [
        {
          // 打包格式
          format: 'es',
          // 打包后文件名
          entryFileNames: '[name].mjs',
          // 让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          // 配置打包根目录
          dir: 'es',
          preserveModulesRoot: 'src',
        },
        {
          // 打包格式
          format: 'cjs',
          // 打包后文件名
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          // 配置打包根目录
          dir: 'lib',
          preserveModulesRoot: 'src',
        },
      ],
    },
    lib: {
      entry: 'src/index.ts',
    },
  },
})
