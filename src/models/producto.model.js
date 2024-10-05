const Producto = new Schema({
    menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    name: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String },
    descripcion: { type: String },
  });
  
  module.exports = mongoose.model('Producto', Producto);