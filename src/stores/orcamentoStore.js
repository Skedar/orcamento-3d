import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrcamentoStore = defineStore('orcamento', {
  state: () => ({
    orcamentos: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchOrcamentos() {
      this.loading = true
      try {
        const response = await axios.get('/api/orcamentos')
        this.orcamentos = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async createOrcamento(orcamentoData) {
      try {
        const response = await axios.post('/api/orcamentos', orcamentoData)
        this.orcamentos.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      }
    }
  }
}) 