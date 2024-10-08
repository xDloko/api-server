import Useradmin from "../models/useradmin.model.js";
import bcypt from "bcryptjs";
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