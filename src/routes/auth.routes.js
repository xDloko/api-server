import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/valdator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login",validateSchema(loginSchema), login);
router.post("/register", validateSchema(registerSchema) ,register);
router.post("/logout", authRequired, logout);
router.get("/profile", authRequired, profile);

export default router;
