import mongoose from "mongoose";

const Useradmin = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  pass: { type: String },
  
});

export default mongoose.model('Useradmin', Useradmin);