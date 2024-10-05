const Menu = new Schema({
  tienda_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tienda', required: true },
  name: { type: String, required: true },
  descripcion: { type: String },
  categoria: { type: string, enum: ['cliente', 'tienda'], required: true }
  
});

module.exports = mongoose.model('Menu', MenuSchema);