import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import axios from 'axios'

// Store Vuex
const store = createStore({
  state() {
    return {
      loading: false,
      error: null,
      success: null
    }
  },
  mutations: {
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_SUCCESS(state, message) {
      state.success = message
    }
  }
})

// Configuração do Axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL || ''

// Criar e montar a aplicação
const app = createApp(App)

// Usar plugins
app.use(router)
app.use(store)

// Montar a aplicação
app.mount('#app')


