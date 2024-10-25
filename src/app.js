import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import authstoreRoutes from './routes/Stores.routes.js'
import systemRoutes from './routes/system.routes.js'
import cors from 'cors'
import { Server as SocketIo } from 'socket.io';
import http from 'http';
import Message from './models/chat.model.js';

const app = express()
app.use(morgan('dev'));
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/user",authRoutes);
app.use("/api/store",authstoreRoutes);
app.use("/api/system",systemRoutes);

const server = http.createServer(app);

const io = new SocketIo(server, {
    cors: {
      origin: ["http://localhost:8000","http://api-server-production-12d3.up.railway.app"], 
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    Message.find().sort({ fecha: 1 }).then((mensajes) => {
    socket.emit('mensajes_anteriores', mensajes);
    });

    socket.on('nuevo_mensaje', async (data) => {
      const nuevoMensaje = new Mensaje({
        username: data.username,
        texto: data.texto,
        fecha: new Date(),
      });
      await nuevoMensaje.save();
      io.emit('actualizar_mensajes', data);
    });
  
    //desconexión
    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });
  
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    }
);
  

export default app;
