const handleUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('stl_file', file);

    const response = await api.post('/calculate', formData);
    // resto do código...
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
  }
}; 