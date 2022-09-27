import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import './app.less'
// Vant 桌面端适配
import '@vant/touch-emulator'

// import 'normalize.css'
import './assets/css/index.css'
const app = createApp(App)

app
  .use(router)
  .use(<any>i18n)
  .use(createPinia())

app.mount('#app')
