import Tienda from "../models/store.model.js";
import Producto from '../models/producto.model.js'
import Pedido from '../models/pedido.model.js'
import bcrypt from "bcryptjs";
import Menu from "../models/menu.model.js";
import express from 'express';
import Factura from '../models/factura.model.js';  
import { uploadToS3 } from '../Images-SDK/AWS.js';
import { storecreateAccesToken } from '../libs/jwt-store.js'
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});


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
      name: storeFound.name,
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

    const result = await uploadToS3(req.file);

    const newProducto = new Producto({
      menu_id,
      name,
      precio,
      categoria,
      descripcion,
      image: result.Location,
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
    const producto = await Producto.findById(producto_id);
    if (!producto) {
      return res.status(404).json({ message: 'No se ha encontrado el elemento' });
    }
    const imagenKey = producto.image.split('/').pop();

    await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${imagenKey}` 
    }).promise();

    await Producto.findByIdAndDelete(producto_id);

    return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    return res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

/** Pedidos */

export const obtenerPedidos= async ( req, res )=>{
  try {
    const { tienda_id } = req.body
    const pedido = await Pedido.find({tienda_id}).populate('productos.producto_id', 'name').populate('user_id', 'username');
    if (!pedido.length) {
      return res.status(404).json({ message: 'No se encontraron pedidos para esta tienda' });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const crearPedido = async (req, res) => {
  try {
    const { tienda_id, user_id, total, productos } = req.body;

    const newPedido = new Pedido({
      tienda_id,
      user_id,
      total,
      productos,
    });

    await newPedido.save();
    res.status(200).json('ok');
  } catch {
    console.error('Error al crear el pedido:', error);
    return res.status(500).json({ message: 'Error al crear el pedido', error });
  }

}

export const deletePedido = async (req, res) => {
  try {
    const { pedido_id } = req.body;

    const elemento = await Pedido.findByIdAndDelete(pedido_id);

    if (!elemento) {
      return res.status(404).json({ message: 'No se ha encontrado el Pedido' });
    }




    return res.status(200).json('OK');
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el Pedido', error });
  }
};



export const aceptPedido = async (req, res) => {
  const { pedido_id } = req.body;

  try {
    // Encontramos el pedido en base al ID (si tienes un modelo de Pedido)
    const pedido = await Pedido.findById(pedido_id).populate('user_id tienda_id');

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    // Creamos la nueva factura
    const nuevaFactura = new Factura({
      tienda_id: pedido.tienda_id,
      user_id: pedido.user_id,
      total: pedido.total,
      productos: pedido.productos
    });

    console.log("Si corree")

    // Guardamos la factura en la base de datos
    await nuevaFactura.save();

    // Opcional: actualizamos el estado del pedido a "Aceptado"
    pedido.estado = 'Aceptado';
    await pedido.save();

    res.status(201).json({ message: 'Factura creada exitosamente', factura: nuevaFactura });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la factura', error });
  }
};




