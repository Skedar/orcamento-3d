import { ref } from 'vue'
import axios from 'axios'

export function useUpload() {
  const uploading = ref(false)
  const uploadProgress = ref(0)
  const uploadError = ref(null)

  const uploadFile = async (file) => {
    uploading.value = true
    uploadError.value = null
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('/api/upload.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          uploadProgress.value = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
        }
      })
      return response.data.url
    } catch (error) {
      uploadError.value = 'Erro no upload do arquivo'
      throw error
    } finally {
      uploading.value = false
    }
  }

  return {
    uploadFile,
    uploading,
    uploadProgress,
    uploadError
  }
} 