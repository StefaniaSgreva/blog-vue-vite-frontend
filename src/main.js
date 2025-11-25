import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js' // importa il router

createApp(App)
  .use(router) // collega router all'app
  .mount('#app')
