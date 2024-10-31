import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'

// Criar instâncias
const router = createRouter({
  history: createWebHistory(),
  routes
})

const vuexStore = createStore(store)

// Criar e montar app
const app = createApp(App)

app.use(router)
app.use(vuexStore)
app.mount('#app')


