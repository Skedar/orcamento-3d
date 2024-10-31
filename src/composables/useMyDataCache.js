import { ref } from 'vue'
import axios from 'axios'

const CACHE_KEY = 'mydata_cache'
const CACHE_DURATION = 1000 * 60 * 60 // 1 hora

export function useMyDataCache() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getCachedData = () => {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { data: cachedData, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_DURATION) {
        return cachedData
      }
    }
    return null
  }

  const setCachedData = (newData) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: newData,
      timestamp: Date.now()
    }))
  }

  const fetchMyData = async (forceRefresh = false) => {
    if (!forceRefresh) {
      const cachedData = getCachedData()
      if (cachedData) {
        data.value = cachedData
        return cachedData
      }
    }

    loading.value = true
    try {
      const response = await axios.get('/mydata.json')
      data.value = response.data
      setCachedData(response.data)
      return response.data
    } catch (err) {
      error.value = 'Erro ao carregar dados'
      console.error('Erro ao carregar mydata.json:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    fetchMyData
  }
} 