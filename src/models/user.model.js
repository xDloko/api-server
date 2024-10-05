import mongoose from "mongoose";

const User = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  direccion: { type: String },
  ubicacion: { type: String },
  telefono: { type: String },
});

export default mongoose.model('User', User);