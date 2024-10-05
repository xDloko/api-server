const Tienda = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    direccion: { type: String },
    ubicacion: { type: String },
    imagen: { type: String },
    descripcion: { type: String },
    propietario: { type: string, required: true }
  });
  
  module.exports = mongoose.model('Tienda', Tienda);