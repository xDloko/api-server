import Useradmin from "../models/useradmin.model.js";
import Tienda from "../models/store.model.js";
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

