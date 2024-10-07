import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import authstoreRoutes from './routes/Stores.routes.js'
import systemRoutes from './routes/system.routes.js'
import cors from 'cors'

const app = express()
app.use(morgan('dev'));
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/user",authRoutes);
app.use("/api/store",authstoreRoutes);
app.use("/api/system",systemRoutes);


export default app;
