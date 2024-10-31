<template>
  <div class="upload-container">
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      class="d-none"
      accept=".stl,.obj,.3mf"
    >
    
    <div class="upload-area" @click="triggerFileInput" @drop.prevent="handleDrop" @dragover.prevent>
      <div v-if="!uploading" class="upload-prompt">
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Arraste seu arquivo 3D aqui ou clique para selecionar</p>
        <small>Formatos aceitos: STL, OBJ, 3MF</small>
      </div>
      
      <div v-else class="upload-progress">
        <div class="progress">
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
      </div>
    </div>

    <div v-if="uploadError" class="alert alert-danger mt-2">
      {{ uploadError }}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useUpload } from '@/composables/useUpload'

export default defineComponent({
  name: 'FileUpload',
  
  emits: ['upload-complete'],
  
  setup(props, { emit }) {
    const fileInput = ref(null)
    const { uploadFile, uploading, uploadProgress, uploadError } = useUpload()

    const triggerFileInput = () => {
      fileInput.value.click()
    }

    const handleFileChange = async (event) => {
      const file = event.target.files[0]
      if (file) {
        try {
          const url = await uploadFile(file)
          emit('upload-complete', url)
        } catch (error) {
          console.error('Erro no upload:', error)
        }
      }
    }

    const handleDrop = async (event) => {
      const file = event.dataTransfer.files[0]
      if (file) {
        try {
          const url = await uploadFile(file)
          emit('upload-complete', url)
        } catch (error) {
          console.error('Erro no upload:', error)
        }
      }
    }

    return {
      fileInput,
      uploading,
      uploadProgress,
      uploadError,
      triggerFileInput,
      handleFileChange,
      handleDrop
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
  
  &:hover {
    border-color: #007bff;
    background-color: rgba(0, 123, 255, 0.05);
  }
}

.upload-prompt {
  i {
    font-size: 3rem;
    color: #6c757d;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 0.5rem;
  }
  
  small {
    color: #6c757d;
  }
}

.upload-progress {
  padding: 1rem;
  
  .progress {
    height: 20px;
  }
}
</style> 