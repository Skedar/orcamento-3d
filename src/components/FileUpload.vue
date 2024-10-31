<template>
    <div>
      <!-- Área de upload original -->
      <div class="upload-container"
           @drop.prevent="handleDrop"
           @dragover.prevent="dragover = true"
           @dragleave.prevent="dragover = false"
           :class="{ 
             'is-dragover': dragover,
             'is-uploading': uploading 
           }">
        
        <input type="file" 
               ref="fileInput" 
               @change="handleFileSelect" 
               accept=".stl"
               class="file-input"
               :disabled="uploading" />
        
        <div class="upload-content">
          <template v-if="!uploading">
            <span class="upload-icon" @click="$refs.fileInput.click()">📁</span>
            <p class="upload-text">
              Arraste seu arquivo STL aqui ou
              <button @click="$refs.fileInput.click()" class="upload-button">
                selecione um arquivo
              </button>
            </p>
          </template>
          
          <template v-else>
            <div class="upload-progress">
              <div class="progress">
                <div class="progress-bar" 
                     :style="{ width: `${uploadProgress}%` }"
                     :class="{ 'is-animating': uploading }">
                </div>
              </div>
              <p class="upload-status">{{ uploadStatus }} ({{ uploadProgress }}%)</p>
            </div>
          </template>
        </div>
      </div>
  
      <!-- Adicionar apenas o visualizador aqui -->
      <StlViewer 
        v-if="selectedFile"
        :fileUrl="fileUrl"
        class="stl-viewer-container"
      />
    </div>
  </template>
  
  <script>
  import StlViewer from './StlViewer.vue'
  
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
        selectedFile: null,
        fileUrl: null
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
      async processFile(file) {
        if (!file.name.toLowerCase().endsWith('.stl')) {
          alert('Por favor, selecione um arquivo STL')
          return
        }
  
        this.selectedFile = file
  
        // Criar URL do arquivo
        this.fileUrl = URL.createObjectURL(file)
  
        try {
          this.uploading = true
          this.uploadProgress = 0
          this.uploadStatus = 'Iniciando upload'
  
          const progressInterval = setInterval(() => {
            if (this.uploadProgress < 90) {
              this.uploadProgress += 5
              this.uploadStatus = 'Enviando arquivo'
            }
          }, 200)
  
          const response = await fetch(process.env.VUE_APP_LAMBDA_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              fileName: file.name,
              fileType: 'model/stl'
            })
          })
  
          clearInterval(progressInterval)
  
          if (!response.ok) {
            throw new Error('Erro ao processar arquivo')
          }
  
          const data = await response.json()
          this.uploadProgress = 100
          this.uploadStatus = 'Upload concluído!'
          
          setTimeout(() => {
            this.$emit('upload-success', data)
            this.resetUpload()
          }, 1000)
  
        } catch (error) {
          console.error('Erro:', error)
          this.uploadProgress = 0
          this.uploadStatus = 'Erro no upload'
          this.$emit('upload-error', error.message)
          this.fileUrl = null
        }
      },
      resetUpload() {
        this.uploading = false
        this.uploadProgress = 0
        this.uploadStatus = ''
        if (this.fileUrl) {
          URL.revokeObjectURL(this.fileUrl)
          this.fileUrl = null
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .upload-container {
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
    
    &.is-uploading {
      border-color: #2196f3;
      background-color: rgba(33, 150, 243, 0.05);
      pointer-events: none;
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
    
    &:disabled {
      cursor: not-allowed;
    }
  }
  
  .upload-content {
    position: relative;
    z-index: 1;
  }
  
  .upload-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .upload-text {
    margin: 0;
    color: #666;
  }
  
  .upload-button {
    background: none;
    border: none;
    color: #2196f3;
    cursor: pointer;
    font-size: inherit;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .upload-progress {
    padding: 1rem;
  }
  
  .progress {
    height: 6px;
    background-color: #f5f5f5;
    border-radius: 3px;
    margin: 1rem 0;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }
  
  .progress-bar {
    height: 100%;
    background-color: #ff9800;
    transition: width 0.5s ease;
    
    &.is-animating {
      background: linear-gradient(
        90deg,
        #ff9800 0%,
        #ffa726 50%,
        #ff9800 100%
      );
      background-size: 200% 100%;
      animation: loading 2s infinite;
    }
  }
  
  .upload-status {
    margin: 0.5rem 0 0;
    color: #666;
    font-size: 0.9rem;
  }
  
  @keyframes loading {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
  
  .stl-viewer-container {
    margin-top: 2rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  </style>