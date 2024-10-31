<template>
  <div class="home">
    <div class="container py-5">
      <h1 class="mb-4">Orçamento de Impressão 3D</h1>
      
      <FileUpload @upload-success="handleUploadSuccess" @upload-error="handleUploadError" />
      <NotificationList />
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue'
import NotificationList from '@/components/NotificationList.vue'

export default {
  name: 'HomePage',
  components: {
    FileUpload,
    NotificationList
  },
  setup() {
    const handleUploadSuccess = (fileId) => {
      console.log('Upload realizado com sucesso:', fileId)
    }

    const handleUploadError = (error) => {
      console.error('Erro no upload:', error)
    }

    return {
      handleUploadSuccess,
      handleUploadError
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/_variables.scss' as vars;

.home {
  min-height: 100vh;
  padding: 2rem 0;
}
</style>