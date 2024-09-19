import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    tienda: { type: String, required: true },
    producto: [
      {
        nombre: { type: String, required: true },
        precio: { type: Number, required: true },
        categoria: { type: String }
      }
    ]
  }, { timestamps: true });
  
  export default mongoose.model('Menu', menuSchema);
  