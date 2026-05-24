import { z } from 'zod';

export const createSedeSchema = z.object({
  nombre_sede:    z.string().min(2).max(80),
  direccion:      z.string().min(5).max(120),
  id_ciudad:      z.number().int().positive(),
  telefono_sede:  z.string().max(15).optional(),
  correo_sede:    z.string().email().optional(),
  nivel_atencion: z.number().int().min(1).max(3).default(1),
});

export const updateSedeSchema = createSedeSchema.partial();
export type CreateSedeDto = z.infer<typeof createSedeSchema>;
export type UpdateSedeDto = z.infer<typeof updateSedeSchema>;