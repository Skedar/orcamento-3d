<template>
  <div class="upload-container">
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      class="d-none"
      accept=".stl,.obj,.3mf"
    >
    
    <div 
      class="upload-area" 
      :class="{ 'is-dragging': isDragging }"
      @click="triggerFileInput" 
      @drop.prevent="handleDrop" 
      @dragover.prevent
      @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
    >
      <div v-if="!uploading && !currentFile" class="upload-prompt">
        <i class="fas fa-cloud-upload-alt fa-3x mb-3"></i>
        <p class="mb-2">Arraste seu arquivo 3D aqui ou clique para selecionar</p>
        <small class="text-muted">Formatos aceitos: STL, OBJ, 3MF</small>
        <small class="d-block text-muted">Tamanho máximo: 50MB</small>
      </div>
      
      <div v-else-if="currentFile && !uploading" class="file-info">
        <i class="fas fa-file-code fa-2x mb-2"></i>
        <p class="mb-1">{{ currentFile.name }}</p>
        <p class="small text-muted">{{ formatFileSize(currentFile.size) }}</p>
        <button 
          class="btn btn-sm btn-outline-danger mt-2"
          @click.stop="removeFile"
        >
          Remover arquivo
        </button>
      </div>
      
      <div v-else class="upload-progress">
        <div class="progress mb-3">
          <div 
            class="progress-bar" 
            role="progressbar" 
            :style="{ width: `${uploadProgress}%` }"
            :aria-valuenow="uploadProgress"
            aria-valuemin="0" 
            aria-valuemax="100"
          >
            {{ uploadProgress }}%
          </div>
        </div>
        <p class="small text-muted">{{ uploadStatus }}</p>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

export default defineComponent({
  name: 'FileUpload',
  
  emits: ['upload-success', 'upload-error'],
  
  setup(props, { emit }) {
    const store = useStore()
    const fileInput = ref(null)
    const currentFile = ref(null)
    const uploading = ref(false)
    const uploadProgress = ref(0)
    const error = ref(null)
    const isDragging = ref(false)

    // Status do upload
    const uploadStatus = computed(() => {
      if (uploadProgress.value === 0) return 'Iniciando upload...'
      if (uploadProgress.value === 100) return 'Processando arquivo...'
      return 'Enviando arquivo...'
    })

    // Validação de arquivo
    const validateFile = (file) => {
      const maxSize = 50 * 1024 * 1024 // 50MB
      const validTypes = ['.stl', '.obj', '.3mf']
      const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'))

      if (file.size > maxSize) {
        throw new Error('Arquivo muito grande. Tamanho máximo: 50MB')
      }

      if (!validTypes.includes(fileExtension)) {
        throw new Error('Formato de arquivo não suportado')
      }

      return true
    }

    // Formatação do tamanho do arquivo
    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    // Handlers
    const triggerFileInput = () => {
      fileInput.value.click()
    }

    const handleFileChange = async (event) => {
      const file = event.target.files[0]
      if (file) {
        try {
          validateFile(file)
          currentFile.value = file
          await uploadFile(file)
        } catch (err) {
          error.value = err.message
        }
      }
    }

    const handleDrop = async (event) => {
      isDragging.value = false
      const file = event.dataTransfer.files[0]
      if (file) {
        try {
          validateFile(file)
          currentFile.value = file
          await uploadFile(file)
        } catch (err) {
          error.value = err.message
        }
      }
    }

    const removeFile = () => {
      currentFile.value = null
      fileInput.value.value = ''
      error.value = null
      uploadProgress.value = 0
    }

    // Upload para Lambda
    const uploadFile = async (file) => {
      uploading.value = true
      uploadProgress.value = 0
      error.value = null

      try {
        // Simular progresso de upload
        const interval = setInterval(() => {
          if (uploadProgress.value < 90) {
            uploadProgress.value += 10
          }
        }, 200)

        // Enviar para o Lambda
        const response = await axios.post(process.env.VUE_APP_LAMBDA_URL, {
          fileName: file.name,
          fileType: file.type
        })

        clearInterval(interval)
        uploadProgress.value = 100

        // Emitir sucesso
        emit('upload-success', response.data.fileId)
        store.dispatch('notification/notify', {
          message: 'Arquivo processado com sucesso!',
          type: 'success'
        })
      } catch (err) {
        error.value = 'Erro no processamento: ' + (err.response?.data?.message || err.message)
        emit('upload-error', error.value)
      } finally {
        uploading.value = false
      }
    }

    return {
      fileInput,
      currentFile,
      uploading,
      uploadProgress,
      uploadStatus,
      error,
      isDragging,
      triggerFileInput,
      handleFileChange,
      handleDrop,
      removeFile,
      formatFileSize
    }
  }
})
</script>

<style lang="scss" scoped>
.upload-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover, &.is-dragging {
    border-color: #007bff;
    background-color: rgba(0, 123, 255, 0.05);
  }
}

.upload-prompt {
  i {
    color: #6c757d;
  }
}

.file-info {
  i {
    color: #007bff;
  }
}

.upload-progress {
  .progress {
    height: 20px;
    background-color: #e9ecef;
    
    .progress-bar {
      background-color: #007bff;
      transition: width 0.3s ease;
    }
  }
}
</style> 