import { Router } from "express";
import { getMessages, sendMessage} from '../controllers/chat.controller'

// Ruta para obtener mensajes

const router = Router();
router.get('/chat/getmessages', getMessages);

// Ruta para enviar un mensaje
router.post('/chat/sendmessages', sendMessage);
router.post('/chat/sendmessage', sendMessage);

export default router;

