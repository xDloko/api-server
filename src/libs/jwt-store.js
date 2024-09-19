import { STORE_SECRET_TOKEN } from "../config.js";
import jwt from "jsonwebtoken";

export function storecreateAccesToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      STORE_SECRET_TOKEN,
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
