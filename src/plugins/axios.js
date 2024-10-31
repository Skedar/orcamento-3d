import axios from 'axios'
import store from '../store'

// Criar instância do axios
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '',
  timeout: 10000
})

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    store.dispatch('setLoading', true)
    return config
  },
  error => {
    store.dispatch('setLoading', false)
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    store.dispatch('setLoading', false)
    return response
  },
  error => {
    store.dispatch('setLoading', false)
    
    const message = error.response?.data?.message || 'Ocorreu um erro. Tente novamente.'
    store.dispatch('notification/notify', {
      message,
      type: 'error'
    })
    
    return Promise.reject(error)
  }
)

export default axiosInstance 