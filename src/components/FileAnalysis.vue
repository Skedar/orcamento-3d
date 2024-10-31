<template>
  <div class="file-analysis" v-if="fileId">
    <div class="analysis-header">
      <h3>Análise do Arquivo</h3>
      <div class="status-badge" :class="status">
        {{ statusText }}
      </div>
    </div>

    <div class="analysis-content" v-if="analysisData">
      <div class="analysis-grid">
        <div class="analysis-item">
          <span class="label">Dimensões</span>
          <span class="value">
            {{ analysisData.dimensions.x.toFixed(2) }} x 
            {{ analysisData.dimensions.y.toFixed(2) }} x 
            {{ analysisData.dimensions.z.toFixed(2) }} mm
          </span>
        </div>
        
        <div class="analysis-item">
          <span class="label">Volume</span>
          <span class="value">{{ analysisData.volume.toFixed(2) }} cm³</span>
        </div>

        <div class="analysis-item">
          <span class="label">Peso Estimado</span>
          <span class="value">{{ (analysisData.volume * 1.24).toFixed(2) }} g</span>
        </div>

        <div class="analysis-item">
          <span class="label">Tempo Estimado</span>
          <span class="value">{{ formatTime(analysisData.printTime) }}</span>
        </div>
      </div>

      <div class="price-estimate">
        <h4>Estimativa de Preço</h4>
        <div class="price">R$ {{ calculatePrice(analysisData).toFixed(2) }}</div>
      </div>
    </div>

    <div class="analysis-loading" v-else>
      <div class="spinner"></div>
      <p>Analisando arquivo...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileAnalysis',
  props: {
    fileId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      status: 'loading',
      statusText: 'Analisando',
      analysisData: null,
      error: null
    }
  },
  watch: {
    fileId: {
      immediate: true,
      handler(newFileId) {
        if (newFileId) {
          this.startAnalysis(newFileId)
        }
      }
    }
  },
  methods: {
    async startAnalysis(fileId) {
      try {
        this.status = 'loading'
        this.statusText = 'Analisando'
        this.analysisData = null

        const response = await fetch(`${process.env.VUE_APP_LAMBDA_URL}/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fileId })
        })

        if (!response.ok) {
          throw new Error('Erro na análise')
        }

        this.analysisData = await response.json()
        this.status = 'success'
        this.statusText = 'Análise Concluída'
      } catch (error) {
        console.error('Erro na análise:', error)
        this.status = 'error'
        this.statusText = 'Erro na Análise'
        this.error = error.message
      }
    },
    formatTime(minutes) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours}h ${mins}min`
    },
    calculatePrice(data) {
      // Preço base por cm³
      const PRICE_PER_CM3 = 0.50
      // Preço base por hora de impressão
      const PRICE_PER_HOUR = 10

      const materialCost = data.volume * PRICE_PER_CM3
      const timeCost = (data.printTime / 60) * PRICE_PER_HOUR

      return materialCost + timeCost
    }
  }
}
</script>

<style lang="scss" scoped>
.file-analysis {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.analysis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    color: #333;
  }
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;

  &.loading {
    background-color: #fff3e0;
    color: #ff9800;
  }

  &.success {
    background-color: #e8f5e9;
    color: #4caf50;
  }

  &.error {
    background-color: #ffebee;
    color: #f44336;
  }
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.analysis-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .label {
    color: #666;
    font-size: 0.875rem;
  }

  .value {
    font-size: 1.125rem;
    font-weight: 500;
    color: #333;
  }
}

.price-estimate {
  text-align: center;
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 8px;

  h4 {
    margin: 0 0 1rem;
    color: #333;
  }

  .price {
    font-size: 2rem;
    font-weight: 700;
    color: #ff9800;
  }
}

.analysis-loading {
  text-align: center;
  padding: 2rem;

  .spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    border: 3px solid #f5f5f5;
    border-top: 3px solid #ff9800;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  p {
    color: #666;
    margin: 0;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 