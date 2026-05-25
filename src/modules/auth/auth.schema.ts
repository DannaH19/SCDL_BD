import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  username:   z.string().min(3).max(50),
  password:   z.string().min(6),
  Nom_comp:   z.string().min(2).max(80),
  correo_u:   z.string().email().optional(),
  telefono_u: z.string().max(10).optional(),
  ID_rol:     z.number().int().min(1).max(4).default(3),
  estado_u:   z.boolean().default(true),
});

export type LoginDto    = z.infer<typeof loginSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;