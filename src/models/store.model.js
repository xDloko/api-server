import mongoose from "mongoose";

const Tienda = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    direccion: { type: String },
    ubicacion: { type: String },
    imagen: { type: String },
    descripcion: { type: String },
    propietario: { type: String, required: true }
  });
  
export default mongoose.model('Tienda', Tienda);