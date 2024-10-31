<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-4">Orçamentos 3D</h1>
        
        <div class="card shadow-sm">
          <div class="card-body">
            <form @submit.prevent="handleSubmit" class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Dimensões</label>
                <div class="input-group">
                  <input 
                    v-model="form.largura" 
                    type="number" 
                    class="form-control" 
                    placeholder="Largura"
                    required
                  >
                  <input 
                    v-model="form.altura" 
                    type="number" 
                    class="form-control" 
                    placeholder="Altura"
                    required
                  >
                  <input 
                    v-model="form.profundidade" 
                    type="number" 
                    class="form-control" 
                    placeholder="Profundidade"
                    required
                  >
                </div>
              </div>
              
              <div class="col-md-6">
                <label class="form-label">Material</label>
                <select v-model="form.material" class="form-select" required>
                  <option value="">Selecione um material</option>
                  <option value="pla">PLA</option>
                  <option value="abs">ABS</option>
                  <option value="petg">PETG</option>
                </select>
              </div>
              
              <div class="col-12">
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  {{ loading ? 'Calculando...' : 'Calcular Orçamento' }}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
        
        <div v-if="orcamentos.length > 0" class="mt-4">
          <h2>Orçamentos Recentes</h2>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Dimensões</th>
                  <th>Material</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="orcamento in orcamentos" :key="orcamento.id">
                  <td>{{ new Date(orcamento.data).toLocaleDateString() }}</td>
                  <td>{{ `${orcamento.largura}x${orcamento.altura}x${orcamento.profundidade}` }}</td>
                  <td>{{ orcamento.material.toUpperCase() }}</td>
                  <td>R$ {{ orcamento.valor.toFixed(2) }}</td>
                  <td>
                    <button 
                      class="btn btn-sm btn-outline-primary"
                      @click="visualizarOrcamento(orcamento.id)"
                    >
                      Visualizar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useOrcamentoStore } from '@/stores/orcamentoStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  
  setup() {
    const orcamentoStore = useOrcamentoStore()
    const router = useRouter()
    const loading = ref(false)
    const error = ref(null)
    
    const form = ref({
      largura: '',
      altura: '',
      profundidade: '',
      material: ''
    })
    
    onMounted(async () => {
      await orcamentoStore.fetchOrcamentos()
    })
    
    const handleSubmit = async () => {
      loading.value = true
      error.value = null
      
      try {
        const orcamento = await orcamentoStore.createOrcamento(form.value)
        router.push(`/orcamento/${orcamento.id}`)
      } catch (err) {
        error.value = 'Erro ao criar orçamento. Tente novamente.'
      } finally {
        loading.value = false
      }
    }
    
    const visualizarOrcamento = (id) => {
      router.push(`/orcamento/${id}`)
    }
    
    return {
      form,
      loading,
      error,
      handleSubmit,
      visualizarOrcamento,
      orcamentos: orcamentoStore.orcamentos
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
}

.card {
  border-radius: 8px;
  
  .card-body {
    padding: 2rem;
  }
}

.table {
  th, td {
    vertical-align: middle;
  }
}
</style> 