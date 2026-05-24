import { z } from 'zod';

export const createUsuarioSchema = z.object({
  username:   z.string().min(3).max(50),
  contraseña: z.string().min(6),
  Nom_comp:   z.string().max(80).optional(),
  correo_u:   z.string().email().optional(),
  telefono_u: z.string().length(10).optional(),
  ID_rol:     z.number().int().positive(),
});

export const updateUsuarioSchema = createUsuarioSchema.partial().omit({ contraseña: true });

export type CreateUsuarioDto = z.infer<typeof createUsuarioSchema>;
export type UpdateUsuarioDto = z.infer<typeof updateUsuarioSchema>;