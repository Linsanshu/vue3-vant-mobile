import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import './app.less'

// Vant 桌面端适配
import '@vant/touch-emulator'

const app = createApp(App)

app
  .use(router)
  .use(i18n)
  .use(createPinia())

app.mount('#app')
