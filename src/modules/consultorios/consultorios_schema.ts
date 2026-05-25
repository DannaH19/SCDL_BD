import { z } from 'zod';

export const createConsultorioSchema = z.object({
  Num_con:  z.string().max(10).optional(),
  Piso:     z.number().int().optional(),
  Bloque:   z.string().max(15).optional(),
  ID_sede:  z.number().int().positive().optional(),
});

export const updateConsultorioSchema = createConsultorioSchema.partial();
export type CreateConsultorioDto = z.infer<typeof createConsultorioSchema>;
export type UpdateConsultorioDto = z.infer<typeof updateConsultorioSchema>;