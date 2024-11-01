<template>
  <div class="home">
    <div class="container">
      <h1>Orçamento 3D</h1>
      
      <FileUpload 
        @file-processed="handleFileProcessed"
        @upload-error="handleUploadError"
      />

      <div v-if="uploadError" class="error-message">
        {{ uploadError }}
      </div>

      <div class="results-container" v-if="selectedFile && !uploadError">
        <StlViewer 
          :file="selectedFile"
          class="viewer-section"
          @model-error="handleModelError"
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
export default {
  // ... imports existentes ...
  data() {
    return {
      selectedFile: null,
      analysisData: null,
      uploadError: null
    }
  },
  methods: {
    handleFileProcessed(data) {
      this.uploadError = null
      this.selectedFile = data.file
      this.analysisData = data.analysis
    },
    handleUploadError(error) {
      console.error('Erro no upload:', error)
      this.uploadError = error
      this.selectedFile = null
      this.analysisData = null
    },
    handleModelError(error) {
      console.error('Erro no modelo:', error)
      this.uploadError = error
    }
  }
}
</script>

<style scoped>
/* ... estilos existentes ... */

.error-message {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 8px;
  color: #dc2626;
  text-align: center;
}
</style>