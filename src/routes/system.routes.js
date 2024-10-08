import { Router } from 'express'
import { 
    login, adminregister,
} from '../controllers/system.controller.js'

const router = Router()
router.post("/system-login", login)
router.post("/system-register", adminregister)

export default router;