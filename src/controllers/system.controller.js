import Useradmin from "../models/useradmin.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";

export const login = async (req, res) => {
    const { email, password, pass } = req.body;
  
    try {
  
        const userFound = await Useradmin.findOne({email})
        if (!userFound) return res.status(400).json({message: 'user not found'})
  
        const isMatch1 = await bcypt.compare(password, userFound.password);
        if (!isMatch1) return res.status(400).json({message: 'invalid credencials Password'})

        const isMatch2 = await bcypt.compare(pass, userFound.pass);
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
    const token = await storecreateAccesToken({ id: adminsaved._id });
    
    res.cookie("token", token);
    res.json({
      id: adminsaved._id,
      email: adminsaved.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};