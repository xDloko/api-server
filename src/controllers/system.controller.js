import Useradmin from "../models/useradmin.model.js";
import Tienda from "../models/store.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt-admin.js";


/** Admin  */

export const login = async (req, res) => {
    const { email, password, pass } = req.body;
  
    try {
  
        const userFound = await Useradmin.findOne({email})
        if (!userFound) return res.status(400).json({message: 'user not found'})
  
        const isMatch1 = await bcrypt.compare(password, userFound.password);
        if (!isMatch1) return res.status(400).json({message: 'invalid credencials Password'})

        const isMatch2 = await bcrypt.compare(pass, userFound.pass);
        if (!isMatch2) return res.status(400).json({message: 'invalid credencials Pass'})
  
        const token = await createAccesToken({id: userFound._id})
      
        res.cookie('token', token)   
        res.json({
        id: userFound._id,
        email: userFound.email,
      });
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  };

export const adminregister = async (req, res) => {
  const { username, email, password, pass } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const passHash = await bcrypt.hash(pass, 10);
    const newadmin = new Useradmin({
      email,
      username,
      password: passwordHash,
      pass: passHash
    });
    
    const adminsaved = await newadmin.save();
    const token = await createAccesToken({ id: adminsaved._id });
    
    res.cookie("token", token);
    res.json({
      id: adminsaved._id,
      email: adminsaved.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** Users */

export const obtainUsers= async ( req, res )=>{
  const task = await User.find()
  res.status(200).json(task)
}

export const obtainUser= async ( req, res )=>{
  try {
    const { user_id } = req.params;
    const task = await Tienda.findOne({ id: user_id }); 
    if (!task) {
      return res.status(402).json({ message: 'User no encontrado' });
    }
    res.status(200).json(task);
    console.log(task);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
}

export const registerUser = async (req, res) => {
  const { email,  username, password, direccion, ubicacion, telefono } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: passwordHash,
      direccion,
      ubicacion,
      telefono,
    });

    const userSaved = await newUser.save();
    const token = await createAccesToken({id: userSaved._id})
    
    res.cookie('token', token)   

    res.json({
      id: userSaved._id,
      email: userSaved.email,
      username: userSaved.username,
      password: userSaved.password,
      direccion: userSaved.direccion,
      ubicacion: userSaved.ubicacion,
      telefono: userSaved.telefono,
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const editUser = async (req, res) => {
  try {
    const {  id, name, email, password, direccion, ubicacion, descripcion, propietario} = req.body;
    let user = await User.findById(id);
    const passwordHash = await bcrypt.hash(password, 10);
    if (!user) {
      return res.status(404).json({ message: 'User no encontrado' });
    }
    if (name) user.name = name; 
    if (email) user.email = email;
    if (password) user.password = passwordHash;
    if (direccion) user.direccion = direccion; 
    if (ubicacion) user.ubicacion = ubicacion; 
    if (descripcion) user.descripcion = descripcion; 
    if (propietario) user.propietario = propietario; 
    await user.save(); 
    res.json({
      message: 'User actualizado exitosamente ',
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el User' });
  }
};


/** Tienda */

export const obtainStores= async ( req, res )=>{
  const task = await Tienda.find()
  res.status(200).json(task)
}

export const obtainStore= async ( req, res )=>{
  try {
    const { tienda_id } = req.params;
    const task = await Tienda.findOne({ tienda: tienda_id }); 
    if (!task) {
      return res.status(402).json({ message: 'Tienda no encontrada' });
    }
    res.status(200).json(task);
    console.log(task);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error });
  }
}

export const storeRegister = async (req, res) => {
  const { name, email, password, direccion, ubicacion, descripcion, propietario } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newTienda = new Tienda({
      name, 
      email,
      password: passwordHash, 
      direccion, 
      ubicacion, 
      descripcion, 
      propietario
    });
    
    const storeSaved = await newTienda.save();
    
    res.json({
      id: storeSaved._id,
      username: storeSaved.username,
      propietario: storeSaved.propietario,
      email: storeSaved.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
export const editStores = async (req, res) => {
  try {
    const {  id, name, email, password, direccion, ubicacion, descripcion, propietario} = req.body;
    let store = await Tienda.findById(id);
    const passwordHash = await bcrypt.hash(password, 10);
    if (!store) {
      return res.status(404).json({ message: 'Store no encontrado' });
    }
    if (name) store.name = name; 
    if (email) store.email = email;
    if (password) store.password = passwordHash;
    if (direccion) store.direccion = direccion; 
    if (ubicacion) store.ubicacion = ubicacion; 
    if (descripcion) store.descripcion = descripcion; 
    if (propietario) store.propietario = propietario; 
    await store.save(); 
    res.json({
      message: 'Store actualizado exitosamente ',
      store
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar La Store' });
  }
};

export const deleteStore = async (req, res) => {
  const { store_id } = req.body;
  const elementoEliminar = await Tienda.findByIdAndDelete(store_id)
  if(!elementoEliminar) res.status(404).json({message: 'No se ha encontrado la Store'})
    res.status(200).json({ message: 'Store eliminado' });
};

