import { z } from 'zod';

export const createSedeSchema = z.object({
  Nom_sede:   z.string().min(2).max(60),
  Direc_s:    z.string().max(100).optional(),
  Telefono_s: z.string().max(10).optional(),
  Correo_s:   z.string().email().optional(),
  ID_ciudad:  z.number().int().positive().optional(),
});

export const updateSedeSchema = createSedeSchema.partial();
export type CreateSedeDto = z.infer<typeof createSedeSchema>;
export type UpdateSedeDto = z.infer<typeof updateSedeSchema>;