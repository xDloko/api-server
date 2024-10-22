import { Router } from "express";
import { getMessages, sendMessage} from '../controllers/chat.controller.js'

// Ruta para obtener mensajes

const router = Router();
router.get("/getmessages", getMessages);

// Ruta para enviar un mensaje
router.post("/sendmessage", sendMessage);

export default router;

