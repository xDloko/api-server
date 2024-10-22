import { Router } from 'express'
import { 
    login,
    adminregister, 
    obtainStore, 
    obtainStores, 
    storeRegister,
    editStores,
    deleteStore,
    obtainUsers,
    obtainUser,
    registerUser,
    editUser,
    deleteUser, 
} from '../controllers/system.controller.js'

import { getMessages, sendMessage } from '../controllers/system.controller.js';


const router = Router()
router.post("/system-login", login)
router.post("/system-register", adminregister)

/** User */
router.get("/system-users", obtainUsers)
router.post("/system-user", obtainUser)
router.post("/system-user-register", registerUser)
router.post("/system-user-edit", editUser)
router.post("/system-user-delete", deleteUser)

/** store */
router.get("/system-stores", obtainStores)
router.post("/system-store", obtainStore)
router.post("/system-store-create", storeRegister)
router.post("/system-store-edit", editStores)
router.post("/system-store-delete", deleteStore)

/** chats */
router.get("/get-messages", getMessages);
router.post("/send-message", sendMessage);

export default router;