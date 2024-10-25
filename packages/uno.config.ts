import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { getColorPaletteVars } from './composables/color'

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', '.git', '.husky', '.vscode', 'public', 'build', 'mock'],
    },
  },
  theme: {
    colors: {
      ...getColorPaletteVars(),
    },
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1680px',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
  shortcuts: [
    {
      'wh-full': 'w-full h-full',
    },
    {
      'flex-center': 'flex justify-center items-center',
      'flex-x-center': 'flex justify-center',
      'flex-y-center': 'flex items-center',
      'flex-vertical': 'flex flex-col',
      'flex-vertical-center': 'flex-center flex-col',
      'flex-vertical-stretch': 'flex-vertical items-stretch',
      'i-flex-center': 'inline-flex justify-center items-center',
      'i-flex-x-center': 'inline-flex justify-center',
      'i-flex-y-center': 'inline-flex items-center',
      'i-flex-vertical': 'inline-flex flex-col',
      'i-flex-vertical-stretch': 'i-flex-vertical items-stretch',
      'flex-1-hidden': 'flex-1 overflow-hidden',
    },
    {
      'absolute-lt': 'absolute left-0 top-0',
      'absolute-lb': 'absolute left-0 bottom-0',
      'absolute-rt': 'absolute right-0 top-0',
      'absolute-rb': 'absolute right-0 bottom-0',
      'absolute-tl': 'absolute-lt',
      'absolute-tr': 'absolute-rt',
      'absolute-bl': 'absolute-lb',
      'absolute-br': 'absolute-rb',
      'absolute-center': 'absolute-lt flex-center wh-full',
      'fixed-lt': 'fixed left-0 top-0',
      'fixed-lb': 'fixed left-0 bottom-0',
      'fixed-rt': 'fixed right-0 top-0',
      'fixed-rb': 'fixed right-0 bottom-0',
      'fixed-tl': 'fixed-lt',
      'fixed-tr': 'fixed-rt',
      'fixed-bl': 'fixed-lb',
      'fixed-br': 'fixed-rb',
      'fixed-center': 'fixed-lt flex-center wh-full',
    },
    {
      'nowrap-hidden': 'overflow-hidden whitespace-nowrap',
      'ellipsis-text': 'nowrap-hidden text-ellipsis',
    },
    {
      'sider-shadow': 'shadow-[2px_0_8px_0_#00152914] dark:shadow-[2px_0_8px_0_#1f2937]',
      'header-shadow': 'shadow-[0_1px_2px_0_#00152914] dark:shadow-[0_1px_2px_0_#1f2937]',
      'tab-shadow': 'shadow-[0_1px_2px_0_#00152914] dark:shadow-[0_1px_2px_0_#1f2937]',
    },
    {
      'card': 'rounded-lg border-(1 gray-2 solid) shadow-sm',
      'modal-card': 'max-w-[90%] md:max-w-[80%] lg:max-w-[60%] 3xl:max-w-63rem max-h-[90vh]', // 63 = 105 * 60%
      'modal-card-overflow': 'modal-card overflow-y-auto scrollbar transition-all duration-300',
      'modal-title': 'text-lg font-bold mb-3',
      'modal-header': 'sticky top-0 z-80 backdrop-blur-lg',
      'modal-footer': 'sticky bottom-0 z-80 backdrop-blur-lg',
      'scrollbar': '[&::-webkit-scrollbar]:(w-2 ml-1) [&::-webkit-scrollbar-track]:(rounded-full bg-gray-1) [&::-webkit-scrollbar-thumb]:(rounded-full bg-gray-3) dark:[&::-webkit-scrollbar-track]:bg-zinc-7 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-5',
      'horizontal-divider': 'border-(0 t solid)',
      'horizontal-b-divider': 'border-(0 b solid)',
      'vertical-divider': 'border-(0 l solid)',
      'page': 'm-3 h-full rounded',
      'text-placeholder': 'text-[#c2c2c2]',
    },
    {
      'bg-primary-hover': 'bg-primary/10 dark:bg-primary/15',
    },
  ],
})
