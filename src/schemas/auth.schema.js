import { z } from "zod";
export const registerSchema = z.object({
  
  username: z.string({
    requires_error: "credenciales incorrectas",
  }),

  email: z
    .string({
      required_error: "correo invalido",
    })
    .email(),

  password: z
    .string({
      required_error: "credenciales incorrectas",
    })
    .min(6, {
      message: "la contraseña debe tener al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      required_error: "correo invalido",
    }),
  password: z
    .string({
      requires_error: "credenciales incorrectas",
    })
    .min(6, {
      message: "la contraseña debe tener al menos 6 caracteres",
    }),
});
