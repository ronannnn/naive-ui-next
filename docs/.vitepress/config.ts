import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'src',
  title: 'Naive UI Next',
  description: 'Naive UI based Vue3 component library',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/installation.md' },
      { text: 'Components', link: '/components/table.md' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Installation', link: '/guide/installation' },
        ],
      },
      {
        text: 'Components',
        items: [
          {
            text: 'Buttons',
            collapsed: false,
            items: [
              { text: 'Tooltip Button', link: '/components/buttons/tooltip-button' },
              { text: 'Dropdown Button', link: '/components/buttons/dropdown-button' },
            ],
          },
          {
            text: 'Tables',
            collapsed: false,
            items: [
              { text: 'Server Table', link: '/components/table/server-table' },
              { text: 'Client Table', link: '/components/table/client-table' },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ronannnn/naive-ui-next' },
    ],
  },
})
