const AWS = require('aws-sdk')
const s3 = new AWS.S3()

// Configurações do bucket
const BUCKET_NAME = process.env.BUCKET_NAME
const EXPIRATION = 300 // 5 minutos para URL pré-assinada

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const { fileName, fileType } = body
    
    // Gerar ID único para o arquivo
    const fileId = `${Date.now()}-${fileName}`
    
    // Gerar URL pré-assinada para upload
    const s3Params = {
      Bucket: BUCKET_NAME,
      Key: fileId,
      ContentType: fileType,
      Expires: EXPIRATION,
      ACL: 'private'
    }
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        uploadUrl: uploadURL,
        fileId: fileId,
        expiresIn: EXPIRATION
      })
    }
  } catch (error) {
    console.error('Erro:', error)
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        error: 'Erro ao gerar URL de upload'
      })
    }
  }
} 