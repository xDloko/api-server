import { Router } from 'express'
import { storeRegister, registrarProducto, añadirProductos, login, storelogout, obtenerTiendas } from '../controllers/store.controller.js'
import { storeRequired } from '../middlewares/storeValidate.js'

const router = Router()
/** Tiendas */
router.post("/tienda-register", storeRegister)
router.post("/tienda-login", login)
router.post("/tienda-logout", storelogout)
/** Menus */
router.post("/tienda-crearmenu", crearMenu)
router.post("/tienda-editarmenu", editarMenu)
router.post("/tienda-vermenu", obtenerMenus)
router.post("/tienda-eliminarmenu", eliminarMenu)
/** Productos */
router.post("/tienda-crearproducto", crearProducto)
router.post("/tienda-editarproducto", editarProducto)
router.post("/tienda-verproductos", obtenerProductos)
router.post("/tienda-eliminarproducto", eliminarProducto)
/** admin */
router.post("/admin-vertiendas", obtenerTiendas)
router.post("/admin-vertienda", obtenerTienda)
router.post("/producto", obtenerTiendas)
router.post("/producto", obtenerTiendas)



export default router;
