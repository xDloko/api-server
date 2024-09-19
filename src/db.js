import mongoose from "mongoose";

export const conectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://felps:admin@cluster0.oaa3w.mongodb.net/crud");
        console.log("db is connected")
    }catch (error) {
        console.log('error encontrado', error)
    }
}