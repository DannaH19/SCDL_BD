import { z } from 'zod';

export const createEpsSchema = z.object({
  Nom_eps:     z.string().min(2).max(50),
  NIT:         z.string().max(20).optional(),
  tip_regimen: z.enum(['Contributivo','Subsidiado','Especial']),
  telefono_e:  z.string().max(10).optional(),
  correo_e:    z.string().email().optional(),
  direccion_e: z.string().max(100).optional(),
  ID_ciudad:   z.number().int().positive().optional(),
});

export const updateEpsSchema = createEpsSchema.partial();
export type CreateEpsDto = z.infer<typeof createEpsSchema>;
export type UpdateEpsDto = z.infer<typeof updateEpsSchema>;