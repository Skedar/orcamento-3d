<template>
  <div class="home">
    <div class="container py-5">
      <h1 class="mb-4">Orçamento de Impressão 3D</h1>
      
      <FileUpload 
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
      />
      
      <FileAnalysis 
        v-if="currentFileId"
        :fileId="currentFileId"
      />
      
      <!-- Status do Upload -->
      <div v-if="uploadStatus" 
           :class="['alert', `alert-${uploadStatus.type}`]"
           role="alert">
        <h4 class="alert-heading">{{ uploadStatus.title }}</h4>
        <p>{{ uploadStatus.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue'
import FileAnalysis from '@/components/FileAnalysis.vue'

export default {
  name: 'HomePage',
  components: {
    FileUpload,
    FileAnalysis
  },
  data() {
    return {
      uploadStatus: null,
      currentFileId: null
    }
  },
  methods: {
    handleUploadSuccess(data) {
      this.uploadStatus = {
        type: 'success',
        title: 'Upload Realizado!',
        message: 'Seu arquivo foi enviado com sucesso.'
      }
      this.currentFileId = data.fileId
    },
    handleUploadError(error) {
      this.uploadStatus = {
        type: 'danger',
        title: 'Erro no Upload',
        message: error
      }
      this.currentFileId = null
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  padding: 2rem 0;
}

.alert {
  margin-top: 1.5rem;
  padding: 1.25rem;
  border-radius: 0.375rem;
  
  &.alert-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  &.alert-danger {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .alert-heading {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
  }

  hr {
    border-top-color: inherit;
    opacity: 0.2;
  }
}
</style>