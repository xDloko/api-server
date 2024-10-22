import mongoose from "mongoose";

// Definir el esquema del mensaje
const Message = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true // Elimina espacios en blanco innecesarios al principio y al final
    },
    text: {
        type: String,
        required: true,
        trim: true // Elimina espacios en blanco innecesarios
    },
    timestamp: {
        type: Date,
        default: Date.now // Por defecto, asigna la fecha y hora actual
    }
});

// Crear el modelo basado en el esquema
export default mongoose.model('Message', Message);


