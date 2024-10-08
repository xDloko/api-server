import { Router } from 'express'
import { 
    login, adminregister, obtainStore, obtainStores
} from '../controllers/system.controller.js'

const router = Router()
router.post("/system-login", login)
router.post("/system-register", adminregister)
router.post("/system-stores", obtainStores)
router.post("/system-store", obtainStore)

export default router;