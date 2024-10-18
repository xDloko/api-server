import AWS from 'aws-sdk';
import dotenv from 'dotenv';
const path = require('path');
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  
  // Definir la función uploadToS3
  export const uploadToS3 = async (file) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,  // Nombre del bucket
      Key: `uploads/${Date.now()}_${file.originalname}`,  // Ruta del archivo en S3
      Body: file.buffer,
      ContentType: file.mimetype
    };
  
    try {
      const data = await s3.upload(params).promise();
      return data;
    } catch (error) {
      console.error('Error al subir a S3:', error);
      throw new Error('Error al subir a S3');
    }
  };