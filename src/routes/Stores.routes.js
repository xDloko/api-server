import { Router } from 'express'
import { 
    storeRegister, login, storelogout, obtenerTiendas,
    crearMenu, editarMenu, obtenerMenus, eliminarMenu,
    crearProducto, editarProducto, obtenerProductos, eliminarProducto
} from '../controllers/store.controller.js'
import { storeRequired } from '../middlewares/storeValidate.js'

const router = Router()
/** Tiendas */
router.post("/tienda-register", storeRegister)
router.post("/tienda-login", login)
router.post("/tienda-logout", storelogout)
/** Menus */
router.post("/tienda-crearmenu", crearMenu)
router.post("/tienda-editarmenu", editarMenu)
router.get("/tienda-vermenu", obtenerMenus)
router.post("/tienda-eliminarmenu", eliminarMenu)
/** Productos */
router.post("/tienda-crearproducto", crearProducto)
router.post("/tienda-editarproducto", editarProducto)
router.get("/tienda-verproductos", obtenerProductos)
router.post("/tienda-eliminarproducto", eliminarProducto)
/** admin */
router.post("/admin-vertiendas", obtenerTiendas)
router.post("/admin-vertienda", obtenerTienda)
router.post("/producto", obtenerTiendas)



export default router;
