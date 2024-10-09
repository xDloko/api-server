import Tienda from "../models/store.model.js";
import Producto from '../models/producto.model.js'
import Pedido from '../models/pedido.model.js'
import bcrypt from "bcryptjs";
import Menu from "../models/menu.model.js";
import { storecreateAccesToken } from '../libs/jwt-store.js'


/** Tienda  */

export const storeRegister = async (req, res) => {
  const { name, email, password, direccion, propietario } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newTienda = new Tienda({
      name, 
      email,
      password: passwordHash, 
      direccion,   
      propietario
    });
    
    const storeSaved = await newTienda.save();
    const token = await storecreateAccesToken({ id: storeSaved._id });
    
    res.cookie("token", token);
    res.json({
      id: storeSaved._id,
      email: storeSaved.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const storeFound = await Tienda.findOne({ email });
    if (!storeFound) {
      console.log("error1");
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, storeFound.password);
    if (!isMatch) {
      console.log("error2");
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
};



/** Menus  */

export const crearMenu = async (req, res) => {
  const { tienda_id, name, descripcion, categoria } = req.body;

  try {
    const newMenu = new Menu({
      tienda_id,
      name,
      descripcion,
      categoria,
    });

    await newMenu.save();
    return res.status(200).json({ message: "ok"});
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editarMenu = async (req, res) => {
  try {
    const { name, descripcion, categoria, id } = req.body; // Correcto aquí
    let menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu no encontrado' });
    }
    if (name) menu.name = name; 
    if (descripcion) menu.descripcion = descripcion; 
    if (categoria) menu.categoria = categoria; 
    await menu.save(); 
    res.json({
      message: 'Menu actualizado exitosamente ',
      menu
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el menú' });
  }
};


export const obtenerMenus= async ( req, res )=>{
  try {
    const { tienda_id } = req.body
    const menus = await Menu.find({tienda_id});
    if (!menus.length) {
      return res.status(404).json({ message: 'No se encontraron menús para esta tienda' });
    }
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const eliminarMenu = async (req, res) => {
  const { menu } = req.body;
  const elementoEliminar = await Menu.findByIdAndDelete(menu)
  if(!elementoEliminar) res.status(404).json({message: 'no se ha encontrado el elemento'})

    res.status(200).json({ message: 'Producto eliminado' });

};

/** Productos  */



export const crearProducto = async (req, res) => {
  const { menu_id, name, precio, categoria, descripcion } = req.body;
  
  try {

    const newProducto = new Producto({
      menu_id,
      name,
      precio,
      categoria,
      descripcion
    });

    await newProducto.save();
    res.status(200).json('ok');

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editarProducto = async (req, res) => {
  try {
    const { producto_id, name, precio, categoria, descripcion } = req.body;
    let producto = await Producto.findById(producto_id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    if (name) producto.name = name;
    if (precio) producto.precio = precio;
    if (categoria) producto.categoria = categoria;
    if (descripcion) producto.descripcion = descripcion;
    await producto.save();
    res.json({
      message: 'Menu actualizado exitosamente ',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el menú' });
  }
};

export const obtenerProductos= async ( req, res )=>{
  try {
    const { menu_id } = req.body
    const productoFind = await Producto.find({menu_id});
    if (!productoFind.length) {
      return res.status(404).json({ message: 'No se encontraron productos en este menu' });
    }
    res.status(200).json(productoFind);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const eliminarProducto = async (req, res) => {
  try {
    const { producto_id } = req.body;

    const elementoEliminar = await Producto.findByIdAndDelete(producto_id);

    if (!elementoEliminar) {
      return res.status(404).json({ message: 'No se ha encontrado el elemento' });
    }

    return res.status(200).json('OK');
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

/** Pedidos */

export const obtenerPedidos= async ( req, res )=>{
  try {
    const { tienda_id } = req.body
    const pedido = await Pedido.find({tienda_id});
    if (!pedido.length) {
      return res.status(404).json({ message: 'No se encontraron pedidos para esta tienda' });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const aceptarPedido = async (req, res) => {
  try {
    const { pedido_id } = req.body;

    const elemento = await Producto.findByIdAndDelete(pedido_id);

    if (!elemento) {
      return res.status(404).json({ message: 'No se ha encontrado el Pedido' });
    }




    return res.status(200).json('OK');
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el Pedido', error });
  }
};

export const eliminarPedido = async (req, res) => {
  try {
    const { pedido_id } = req.body;

    const elementoEliminar = await Producto.findByIdAndDelete(pedido_id);

    if (!elementoEliminar) {
      return res.status(404).json({ message: 'No se ha encontrado el Pedido' });
    }

    return res.status(200).json('OK');
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el Pedido', error });
  }
};
