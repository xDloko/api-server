const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://felpssense:aplication@senses.nbg2v.mongodb.net/?retryWrites=true&w=majority&appName=Senses";

import mongoose from "mongoose";

export const conectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://felpssense:aplication@senses.nbg2v.mongodb.net/?retryWrites=true&w=majority&appName=Senses");
        console.log("db is connected")
    }catch (error) {
        console.log('error encontrado', error)
    }
}