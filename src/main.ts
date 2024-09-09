import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import enUs from './locales/en_US.json'
import zhCn from './locales/zh_CN.json'
import 'uno.css'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,

  locale: 'zh_CN' || 'en_US',
  fallbackLocale: 'zh_CN',
  fallbackWarn: false,
  messages: {
    en_US: enUs,
    zh_CN: zhCn,
  },
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
