import { createApp } from 'vue'
import App from '@/App.vue'

import './style.css'

declare global {
  interface Window {
    CESIUM_BASE_URL: string
  }
}

createApp(App).mount('#app')