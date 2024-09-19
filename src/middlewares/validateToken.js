import { SECRET_TOKEN } from "../config.js";
import Jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "no autorization" });
  Jwt.verify(token, SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token" });
    req.user = user;
  });
  next();
};


