import User from "../models/user.model.js";
import bcypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const userFound = await User.findOne({email})
    if (!userFound) return res.status(400).json({message: 'user not found'})

    const isMatch = await bcypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({message: 'invalid credencials'})

    const token = await createAccesToken({id: userFound._id})
    
    res.cookie('token', token)   
    res.json({
      id: userFound._id,
      password: userFound.password,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const register = async (req, res) => {
    const { email, password, username } = req.body;
  
    try {
      const passwordHash = await bcypt.hash(password, 10);
      const newUser = new User({
        username,
        password: passwordHash,
        email,
      });
  
      const userSaved = await newUser.save();
      const token = await createAccesToken({id: userSaved._id})
      
      res.cookie('token', token)   
  
      res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
      });
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  };
  
export const logout = (req, res)=>{
    res.cookie('token', "", {
        espires: new Date(0)
    })

    return res.sendStatus(200);
}

/** debe ir para admin */

export const profile = async (req, res)=>{
  try {
    const user = req.body
    const userFound = await User.findById(user.id)
    if (!userFound)
        return res.status(404).json({message: 'user not found'})
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      direccion: userFound.direccion,
      telefono: userFound.telefono
    }) 
  } catch {
    res.status(500).json({message: error.message})
  }
}