import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    tienda: { type: String, required: true, unique: true, trim: true},
    email: { type: String, required: true, trim: true, unique: true },
    password :{ type: String, required: true },
    dueño :{ type: String, required: true },
    direccion :{ type: String, required: true },
},{timestamps: true
})

export default mongoose.model('Store',  storeSchema)