import mongoose from "mongoose";

const Menu = new mongoose.Schema({
  tienda_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tienda', required: true },
  name: { type: String, required: true },
  descripcion: { type: String },
  categoria: { type: String, enum: ['Fritos', 'Helado', 'Pasa-Bocas'], required: true }
  
});

export default mongoose.model('Menu', Menu);