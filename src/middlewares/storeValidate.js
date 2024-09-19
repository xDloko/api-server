import { STORE_SECRET_TOKEN } from "../config.js";
import Jwt from "jsonwebtoken";

export const storeRequired = (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) return res.status(401).json({ message: "no autorization" });
    Jwt.verify(token, STORE_SECRET_TOKEN, (err, Store) => {
      if (err) return res.status(403).json({ message: "invalid token" });
      req.Store = Store;
    });
    next()
  };