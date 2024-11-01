<template>
  <div class="home">
    <div class="container">
      <h1>Orçamento 3D</h1>
      
      <FileUpload 
        @file-processed="handleFileProcessed"
        @upload-error="handleUploadError"
      />

      <div class="results-container" v-if="selectedFile">
        <StlViewer 
          :file="selectedFile"
          class="viewer-section"
        />
        
        <FileAnalysis 
          v-if="analysisData"
          :analysisData="analysisData"
          class="analysis-section"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue'
import FileAnalysis from '@/components/FileAnalysis.vue'
import StlViewer from '@/components/StlViewer.vue'

export default {
  name: 'Home',
  components: {
    FileUpload,
    FileAnalysis,
    StlViewer
  },
  data() {
    return {
      selectedFile: null,
      analysisData: null
    }
  },
  methods: {
    handleFileProcessed(data) {
      this.selectedFile = data.file
      this.analysisData = data.analysis
    },
    handleUploadError(error) {
      console.error('Erro no upload:', error)
      // Implementar notificação de erro
    }
  }
}
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
}

.results-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

@media (min-width: 992px) {
  .results-container {
    grid-template-columns: 3fr 2fr;
  }
}
</style>