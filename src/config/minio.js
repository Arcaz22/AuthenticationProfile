const Minio = require('minio')

require('dotenv').config()

console.log('MINIO_ENDPOINT', process.env.MINIO_ENDPOINT)
console.log('MINIO_PORT', process.env.MINIO_PORT)
console.log('MINIO_USE_SSL', process.env.MINIO_USE_SSL)
console.log('MINIO_ACCESS_KEY', process.env.MINIO_ACCESS_KEY)
console.log('MINIO_SECRET_KEY', process.env.MINIO_SECRET_KEY)
console.log('BUCKET_NAME', process.env.MINIO_PATH)
console.log('API_VERSION', process.env.MINIO_API)

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
})

const BUCKET_NAME = process.env.MINIO_PATH
const API_VERSION = process.env.MINIO_API

async function generatePresignedUrl(filename) {
  const presignedUrl = await minioClient.presignedGetObject(
    BUCKET_NAME,
    filename,
    7 * 24 * 60 * 60
  )
  return presignedUrl
}

function initializeMinioBucket() {
  minioClient.bucketExists(BUCKET_NAME, (err, exists) => {
    if (err) {
      return console.log(err)
    }
    if (!exists) {
      minioClient.makeBucket(BUCKET_NAME, 'us-east-1', (err) => {
        if (err) return console.log('Error creating bucket.', err)
        console.log(
          `Bucket '${BUCKET_NAME}' created successfully in 'us-east-1'.`
        )
      })
    } else {
      console.log(`Bucket '${BUCKET_NAME}' already exists.`)
    }
  })
}

module.exports = {
  minioClient,
  BUCKET_NAME,
  API_VERSION,
  initializeMinioBucket,
  generatePresignedUrl
}
