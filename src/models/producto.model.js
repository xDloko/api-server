import mongoose from "mongoose";

const Producto = new mongoose.Schema({
    menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    name: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String },
    descripcion: { type: String },
  });
  
  export default mongoose.model('Producto', Producto);