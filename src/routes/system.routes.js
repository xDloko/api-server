import { Router } from 'express'
import { 
    login, adminregister, obtainStore, obtainStores, storeRegister, 
} from '../controllers/system.controller.js'

const router = Router()
router.post("/system-login", login)
router.post("/system-register", adminregister)
router.get("/system-stores", obtainStores)
router.post("/system-store", obtainStore)
router.post("/system-store-create", storeRegister)

export default router;