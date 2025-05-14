import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import zhCN from '../locales/zh-CN'

// Get preferred language from localStorage or default to English
const getLocale = () => {
  const storedLocale = localStorage.getItem('userLanguage')
  if (storedLocale && ['en', 'zh-CN'].includes(storedLocale)) {
    return storedLocale
  }
  return 'en' // Default language
}

const i18n = createI18n({
  legacy: false, // Use the Composition API
  locale: getLocale(),
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'zh-CN': zhCN
  }
})

export default i18n 