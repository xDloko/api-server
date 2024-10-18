const AWS = require('aws-sdk');
import dotenv from 'dotenv';
const path = require('path');
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,    // Usa variables de entorno
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_S3_REGION            // Región del bucket
});

// Función para subir a S3
const uploadToS3 = (file) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME, // Nombre del bucket
        Key: `${Date.now()}-${file.originalname}`, // Nombre del archivo en S3
        Body: file.buffer, // El archivo desde memoria
        ContentType: file.mimetype, // Tipo de contenido (e.g., image/jpeg)
        ACL: 'public-read' // Permitir acceso público (opcional)
    };

    return s3.upload(params).promise(); // Retorna una promesa
};