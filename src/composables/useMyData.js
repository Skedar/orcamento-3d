import { ref, onMounted } from 'vue'
import axios from 'axios'

export function useMyData() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchMyData = async () => {
    loading.value = true
    try {
      const response = await axios.get('/mydata.json')
      data.value = response.data
    } catch (err) {
      error.value = 'Erro ao carregar dados'
      console.error('Erro ao carregar mydata.json:', err)
    } finally {
      loading.value = false
    }
  }

  const updateMyData = async (newData) => {
    try {
      // Aqui mantemos apenas em memória, já que o arquivo é estático
      data.value = { ...data.value, ...newData }
      return true
    } catch (err) {
      error.value = 'Erro ao atualizar dados'
      console.error('Erro ao atualizar dados:', err)
      return false
    }
  }

  onMounted(() => {
    fetchMyData()
  })

  return {
    data,
    loading,
    error,
    fetchMyData,
    updateMyData
  }
} 