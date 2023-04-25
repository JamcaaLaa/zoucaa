import { createApp } from 'vue'
import App from '@/App.vue'

import { routes } from '../routes'

import './style.css'

declare global {
  interface Window {
    CESIUM_BASE_URL: string
  }
}

createApp(App).use(routes).mount('#app')