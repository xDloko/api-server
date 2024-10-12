import { Router } from 'express'
import { 
    storeRegister, login, storelogout,
    crearMenu, editarMenu, obtenerMenus, eliminarMenu,
    crearProducto, editarProducto, obtenerProductos, eliminarProducto,
    obtenerPedidos,
    eliminarPedido,
    aceptarPedido,
    deletePedido,
    aceptPedido
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
router.post("/tienda-vermenu", obtenerMenus)
router.post("/tienda-eliminarmenu", eliminarMenu)
/** Productos */
router.post("/tienda-crearproducto", crearProducto)
router.post("/tienda-editarproducto", editarProducto)
router.post("/tienda-verproductos", obtenerProductos)
router.post("/tienda-eliminarproducto", eliminarProducto)
/** Pedidos */
router.post("/tienda-verpedidos", obtenerPedidos)
router.post("/tienda-deletepedidos", deletePedido)
router.post("/tienda-acceptpedidos", aceptPedido)
/** admin */




export default router;
