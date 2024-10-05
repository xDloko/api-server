const Factura = new Schema({
    tienda_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tienda', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    total: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    productos: [
      {
        producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        cantidad: { type: Number, required: true },
        subtotal: { type: Number, required: true }
      }
    ]
  });
  
  module.exports = mongoose.model('Factura', Factura);