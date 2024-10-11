import './assets/base.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

const storedTheme = localStorage.getItem('theme')
if (
  storedTheme === 'dark' ||
  (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

app.use(createPinia())

app.mount('#app')
