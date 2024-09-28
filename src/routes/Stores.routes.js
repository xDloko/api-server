import { Router } from 'express'
import { storeRegister, registrarProducto, añadirProductos, login, storelogout } from '../controllers/store.controller.js'
import { storeRequired } from '../middlewares/storeValidate.js'

const router = Router()

router.post("/registro-tiendas", storeRegister)
router.post("/producto", registrarProducto)
router.post("/productos-update", storeRequired, añadirProductos)
router.post("/tienda-login", login)
router.post("/tienda-logout", storelogout)
router.post("/tienda-all", obtenerTiendas)

export default router;
