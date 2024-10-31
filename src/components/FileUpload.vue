<template>
  <div class="file-upload">
    <div class="upload-area" 
         @drop.prevent="handleDrop"
         @dragover.prevent="dragover = true"
         @dragleave.prevent="dragover = false"
         :class="{ 'is-dragover': dragover }">
      
      <input type="file" 
             ref="fileInput" 
             @change="handleFileSelect" 
             accept=".stl"
             class="file-input" />
      
      <div class="upload-content">
        <span class="upload-icon">📁</span>
        <p class="upload-text">
          {{ uploading ? 'Enviando arquivo...' : 'Arraste seu arquivo STL aqui ou' }}
          <button v-if="!uploading" 
                  @click="$refs.fileInput.click()" 
                  class="upload-button">
            selecione um arquivo
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  data() {
    return {
      dragover: false,
      uploading: false
    }
  },
  methods: {
    handleDrop(e) {
      this.dragover = false
      const files = e.dataTransfer.files
      if (files.length) {
        this.processFile(files[0])
      }
    },
    handleFileSelect(e) {
      const files = e.target.files
      if (files.length) {
        this.processFile(files[0])
      }
    },
    processFile(file) {
      if (!file.name.toLowerCase().endsWith('.stl')) {
        alert('Por favor, selecione um arquivo STL')
        return
      }

      // Aqui vamos implementar o upload para o Lambda
      console.log('Arquivo selecionado:', file.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.file-upload {
  margin: 2rem 0;
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  
  &.is-dragover {
    border-color: #2196f3;
    background-color: rgba(33, 150, 243, 0.05);
  }
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}

.upload-content {
  pointer-events: none;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.upload-text {
  margin: 0;
  font-size: 1.1rem;
  color: #666;
}

.upload-button {
  background: none;
  border: none;
  color: #2196f3;
  cursor: pointer;
  font-weight: bold;
  padding: 0;
  margin: 0;
  font-size: inherit;
  
  &:hover {
    text-decoration: underline;
  }
}
</style> 