// src/controllers/chat.controller.js
import Message from '../models/chat.model.js'

// Obtener todos los mensajes
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los mensajes' });
    }
};

// Enviar un nuevo mensaje
exports.sendMessage = async (req, res) => {
    const { username, text } = req.body;

    const newMessage = new Message({ username, text });

    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar el mensaje' });
    }
};