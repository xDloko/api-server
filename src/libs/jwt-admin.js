import { ADMIN_SECRET_TOKEN_USE } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccesToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      ADMIN_SECRET_TOKEN_USE,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}