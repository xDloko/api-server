import mongoose from "mongoose";

const Message = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true 
    },
    text: {
        type: String,
        required: true,
        trim: true 
    },
    timestamp: {
        type: Date,
        default: Date.now 
    }
});

export default mongoose.model('Message', Message);


