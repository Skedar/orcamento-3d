<template>
  <div class="home">
    <div class="container py-5">
      <h1 class="mb-4">Orçamento de Impressão 3D</h1>
      <FileUpload 
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
      />
      
      <!-- Mensagem de feedback -->
      <div v-if="message" 
           :class="['alert', messageType === 'error' ? 'alert-danger' : 'alert-success']">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue'

export default {
  name: 'HomePage',
  components: {
    FileUpload
  },
  data() {
    return {
      message: '',
      messageType: 'success'
    }
  },
  methods: {
    handleUploadSuccess(data) {
      this.message = `Arquivo enviado com sucesso! ID: ${data.fileId}`
      this.messageType = 'success'
    },
    handleUploadError(error) {
      this.message = `Erro ao enviar arquivo: ${error}`
      this.messageType = 'error'
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
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
  
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
}
</style>