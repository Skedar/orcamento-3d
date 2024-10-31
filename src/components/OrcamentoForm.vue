<template>
  <div class="orcamento-form">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Material</label>
        <select 
          v-model="formData.material" 
          class="form-select" 
          required
          :class="{ 'is-invalid': errors.material }"
        >
          <option value="">Selecione o material</option>
          <option 
            v-for="material in myData?.materials" 
            :key="material.id" 
            :value="material.id"
          >
            {{ material.name }} - R$ {{ material.price }}/g
          </option>
        </select>
        <div class="invalid-feedback">
          {{ errors.material }}
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Qualidade</label>
        <select 
          v-model="formData.quality" 
          class="form-select" 
          required
          :class="{ 'is-invalid': errors.quality }"
        >
          <option value="">Selecione a qualidade</option>
          <option 
            v-for="quality in myData?.qualities" 
            :key="quality.id" 
            :value="quality.id"
          >
            {{ quality.name }} ({{ quality.description }})
          </option>
        </select>
        <div class="invalid-feedback">
          {{ errors.quality }}
        </div>
      </div>

      <div class="col-12">
        <label class="form-label">Dimensões (mm)</label>
        <div class="row g-2">
          <div class="col-md-4">
            <input 
              v-model.number="formData.dimensions.width" 
              type="number" 
              class="form-control" 
              placeholder="Largura"
              required
              :class="{ 'is-invalid': errors['dimensions.width'] }"
            >
            <div class="invalid-feedback">
              {{ errors['dimensions.width'] }}
            </div>
          </div>
          <div class="col-md-4">
            <input 
              v-model.number="formData.dimensions.height" 
              type="number" 
              class="form-control" 
              placeholder="Altura"
              required
              :class="{ 'is-invalid': errors['dimensions.height'] }"
            >
            <div class="invalid-feedback">
              {{ errors['dimensions.height'] }}
            </div>
          </div>
          <div class="col-md-4">
            <input 
              v-model.number="formData.dimensions.depth" 
              type="number" 
              class="form-control" 
              placeholder="Profundidade"
              required
              :class="{ 'is-invalid': errors['dimensions.depth'] }"
            >
            <div class="invalid-feedback">
              {{ errors['dimensions.depth'] }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="loading || !isValid"
        >
          {{ loading ? 'Calculando...' : 'Calcular Orçamento' }}
        </button>
      </div>

      <div v-if="error" class="col-12">
        <div class="alert alert-danger">
          {{ error }}
        </div>
      </div>
    </form>

    <div v-if="calculatedPrice" class="mt-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Orçamento Calculado</h5>
          <p class="card-text">
            Valor estimado: R$ {{ calculatedPrice.toFixed(2) }}
          </p>
          <button 
            class="btn btn-success"
            @click="handleApprove"
          >
            Aprovar Orçamento
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useMyData } from '@/composables/useMyData'

export default defineComponent({
  name: 'OrcamentoForm',
  
  emits: ['orcamento-approved'],
  
  setup(props, { emit }) {
    const { data: myData, loading, error } = useMyData()
    const calculatedPrice = ref(null)
    
    const formData = ref({
      material: '',
      quality: '',
      dimensions: {
        width: null,
        height: null,
        depth: null
      }
    })

    const calculatePrice = () => {
      const material = myData.value.materials.find(m => m.id === formData.value.material)
      const quality = myData.value.qualities.find(q => q.id === formData.value.quality)
      
      if (!material || !quality) return 0
      
      const volume = formData.value.dimensions.width * 
                    formData.value.dimensions.height * 
                    formData.value.dimensions.depth
      
      const price = material.price * volume
      
      calculatedPrice.value = price
    }

    const handleSubmit = () => {
      calculatePrice()
    }

    const handleApprove = () => {
      emit('orcamento-approved')
    }

    return {
      myData,
      loading,
      error,
      formData,
      calculatedPrice,
      handleSubmit,
      handleApprove
    }
  }
})
</script> 