const multer = require('multer')
const { minioClient, BUCKET_NAME } = require('../config/minio')
const { MAX_SIZE } = require('../common/utils/constant')

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(
      new Error(
        'Invalid file type. Only JPEG, JPG, and PNG image files are allowed.'
      )
    )
  }
}

const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_SIZE
  },
  fileFilter: fileFilter
}).single('avatar')

async function uploadFileToMinio(file) {
  const fileName = `${Date.now()}_${file.originalname}`
  try {
    console.log(
      `Uploading file ${file.originalname} to Minio with filename: ${fileName}`
    )
    await minioClient.putObject(BUCKET_NAME, fileName, file.buffer, {
      'Content-Type': file.mimetype
    })
    console.log('File uploaded successfully to Minio!')
    return fileName
  } catch (error) {
    console.error('Error uploading file to MinIO:', error)
    throw new Error('Failed to upload file')
  }
}

module.exports = {
  multerUpload,
  uploadFileToMinio
}
