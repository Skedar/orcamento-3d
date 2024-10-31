import axios from 'axios'

export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data.url
  } catch (error) {
    throw new Error('Erro no upload do arquivo')
  }
} 