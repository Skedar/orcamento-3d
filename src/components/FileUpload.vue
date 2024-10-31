<template>
  <div>
    <div class="upload-container"
         @drop.prevent="handleDrop"
         @dragover.prevent="dragover = true"
         @dragleave.prevent="dragover = false"
         :class="{ 
           'is-dragover': dragover,
           'is-uploading': uploading 
         }">
      <div class="upload-area">
        <input 
          type="file" 
          @change="handleFileUpload" 
          accept=".stl"
          ref="fileInput"
          class="file-input"
        >
        <div class="upload-text">
          <span>Arraste seu arquivo STL aqui ou clique para selecionar</span>
        </div>
      </div>
    </div>

    <StlViewer 
      v-if="selectedFile"
      :file="selectedFile"
      class="stl-viewer-container"
    />
  </div>
</template>

<script>
import StlViewer from './viewer/StlViewer.vue'

export default {
  components: {
    StlViewer
  },
  data() {
    return {
      dragover: false,
      uploading: false,
      uploadProgress: 0,
      uploadStatus: '',
      selectedFile: null
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file && file.name.endsWith('.stl')) {
        this.processFile(file)
      } else {
        alert('Por favor, selecione um arquivo STL válido')
      }
    },
    async processFile(file) {
      if (!file.name.toLowerCase().endsWith('.stl')) {
        alert('Por favor, selecione um arquivo STL')
        return
      }

      this.selectedFile = file
      
      try {
        this.uploading = true
        // Aqui vamos implementar o upload e visualização
        console.log('Arquivo STL selecionado:', file.name)
      } catch (error) {
        console.error('Erro:', error)
        this.uploadProgress = 0
        this.uploadStatus = 'Erro no upload'
        this.$emit('upload-error', error.message)
      }
    }
  }
}
</script>

<style scoped>
.upload-container {
  width: 100%;
  padding: 20px;
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #2196F3;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-text {
  color: #666;
  font-size: 16px;
}

.stl-viewer-container {
  margin-top: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 