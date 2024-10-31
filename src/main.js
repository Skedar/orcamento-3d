import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)
const pinia = createPinia()

// Configuração global do axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000'

app.use(pinia)
app.use(router)
app.mount('#app')


