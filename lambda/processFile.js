const AWS = require('aws-sdk')
const s3 = new AWS.S3()

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const { fileId } = body
    
    // Verificar se o arquivo existe no S3
    const headParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileId
    }
    
    await s3.headObject(headParams).promise()
    
    // Aqui você pode adicionar lógica adicional para processar o arquivo
    // Por exemplo: verificar dimensões, calcular volume, etc.
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: 'Arquivo processado com sucesso',
        fileId: fileId
      })
    }
  } catch (error) {
    console.error('Erro:', error)
    
    return {
      statusCode: error.code === 'NotFound' ? 404 : 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        error: error.code === 'NotFound' ? 'Arquivo não encontrado' : 'Erro ao processar arquivo'
      })
    }
  }
} 