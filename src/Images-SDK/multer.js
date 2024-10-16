import multer from 'multer';
const storage = multer.memoryStorage(); // Usamos memoria temporal para almacenar la imagen antes de subirla a S3
const upload = multer({ storage: storage }); // No almacenamos en disco, solo en memoria temporal

export default upload;