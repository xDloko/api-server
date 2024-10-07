import { Router } from 'express'
import { 
    login
} from '../controllers/system.controller.js'

const router = Router()
router.post("/system-login", login)

export default router;