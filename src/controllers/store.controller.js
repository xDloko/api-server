import Store from "../models/store.model.js";
import bcrypt from "bcryptjs";
import Menu from "../models/menu.model.js";
import { storecreateAccesToken } from '../libs/jwt-store.js'

export const storeRegister = async (req, res) => {
  const { email, password, tienda, dueño, direccion } = req.body;

  try {
    const passwordHash = await bcypt.hash(password, 10);
    const newStore = new Store({
      tienda,
      password: passwordHash,
      email,
      dueño,
      direccion,
    });

    const storeSaved = await newStore.save();
    const token = await storecreateAccesToken({ id: storeSaved._id });

    res.cookie("token", token);

    res.json({
      id: storeSaved._id,
      username: storeSaved.username,
      email: storeSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerTodoMenu= async ( req, res )=>{
  const task = await Menu.find()
  res.json(Menu)
}

export const ObtenerUnMenu = async (req, res) => {
  try {
    const { producto } = req.body;

    const productoEncontrado = await Menu.findOne({ "producto.nombre": producto });

    if (!productoEncontrado) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(productoEncontrado);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el producto', error });
  }
};

export const eliminarProducto = async (req, res) => {
  const { producto } = req.body;
  const elementoEliminar = await Menu.findOneAndDelete({'producto.nombre': producto})
  if(!elementoEliminar) res.status(404).json({message: 'no se ha encontrado el elemento'})
  res.json('producto eliminado ',elementoEliminar)
}

export const registrarProducto = async (req, res) => {
  const { tienda, producto } = req.body;

  try {
    const newMenu = new Menu({
      tienda,
      producto,
    });

    const MenuSaved = await newMenu.save();
    const token = await storecreateAccesToken({ id: MenuSaved._id });

    res.cookie("token", token);

    res.json({
      id: MenuSaved._id,
      tienda: MenuSaved.tienda,
      producto: MenuSaved.producto,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const añadirProductos = async (req, res) => {
  const { tienda, nombre, precio, categoria } = req.body;

  try {
    // Buscar el menú por el nombre de la tienda
    const menu = await Menu.findOne({ tienda });

    // Verificar si el menú existe
    if (!menu) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    // Asegurarse de que "producto" sea un array
    if (!Array.isArray(menu.producto)) {
      menu.producto = []; // Inicializar como array si no lo es
    }

    // Agregar el nuevo producto al array "producto"
    menu.producto.push({
      nombre,
      precio,
      categoria,
    });

    // Guardar el menú actualizado
    const menuSaved = await menu.save();

    // Responder con el menú guardado
    res.status(200).json(menuSaved);
  } catch (error) {
    // Manejar cualquier error
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const storeFound = await Store.findOne({ email });
    if (!storeFound) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, storeFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = await storecreateAccesToken({ id: storeFound._id });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    res.json({
      id: storeFound._id,
      email: storeFound.email,
    });
  } catch (error) {
    console.error("Error en login:", error); // Añade un log para ver el error
    res.status(500).json({ message: error.message });
  }
};


export const storelogout = (req, res)=>{
  res.cookie('token', "", {
      espires: new Date(0)
  })

  return res.sendStatus(200);
}

export const obtenerTiendas= async ( req, res )=>{
  const task = await Store.find()
  res.status(200).json(task)
}

export const obtenerTienda= async ( req, res )=>{
  try {
    const { tienda } = req.params;
    const task = await Store.findOne({ tienda: tienda }); 
    if (!task) {
      return res.status(402).json({ message: 'Tienda no encontrada' });
    }
    res.status(200).json(task);
    console.log(task);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
}
