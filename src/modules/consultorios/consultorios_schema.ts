import { z } from 'zod';

export const createConsultorioSchema = z.object({
  id_sede:            z.number().int().positive(),
  numero_consultorio: z.string().min(1).max(10),
  piso:               z.number().int().optional(),
  descripcion:        z.string().max(100).optional(),
});

export const updateConsultorioSchema = createConsultorioSchema.partial();
export type CreateConsultorioDto = z.infer<typeof createConsultorioSchema>;
export type UpdateConsultorioDto = z.infer<typeof updateConsultorioSchema>;