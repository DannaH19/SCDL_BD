import { z } from 'zod';

export const createEpsSchema = z.object({
  nombre_eps:   z.string().min(2).max(80),
  nit:          z.string().min(5).max(20),
  tipo_regimen: z.enum(['Contributivo', 'Subsidiado', 'Especial']),
  telefono_eps: z.string().max(15).optional(),
  correo_eps:   z.string().email().optional(),
});

export const updateEpsSchema = createEpsSchema.partial();

export type CreateEpsDto = z.infer<typeof createEpsSchema>;
export type UpdateEpsDto = z.infer<typeof updateEpsSchema>;