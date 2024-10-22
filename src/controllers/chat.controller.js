// src/controllers/chat.controller.js
import Message from '../models/chat.model.js'

// Obtener todos los mensajes
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los mensajes' });
    }
};

// Enviar un nuevo mensaje
export const sendMessage = async (req, res) => {
    const { username, text } = req.body;

    
    try {
        const newMessage = new Message({ username, text });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar el mensaje' });
    }
};
