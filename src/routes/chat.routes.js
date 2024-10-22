import { Router } from "express";
import { getMessages, sendMessage} from '../controllers/chat.controller'

// Ruta para obtener mensajes

const router = Router();
router.get('/getmessages', getMessages);

// Ruta para enviar un mensaje
router.post('/sendmessages', sendMessage);

export default router;

