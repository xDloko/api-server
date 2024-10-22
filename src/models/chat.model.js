import mongoose from "mongoose";

const Message = new mongoose.Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', Message);

