import { Router } from 'express'
import { 
    login,
    adminregister, 
    obtainStore, 
    obtainStores, 
    storeRegister,
    editStores,
    deleteStore, 
} from '../controllers/system.controller.js'

const router = Router()
router.post("/system-login", login)
router.post("/system-register", adminregister)

/** store */

router.get("/system-stores", obtainStores)
router.post("/system-store", obtainStore)
router.post("/system-store-create", storeRegister)
router.post("/system-store-edit", editStores)
router.post("/system-store-delete", deleteStore)

export default router;