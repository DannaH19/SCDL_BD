import { z } from 'zod';

export const createAtencionSchema = z.object({
  ID_cita:       z.number().int().positive(),
  fecha_aten:    z.string().datetime().optional(),
  diagnostico:   z.string().optional(),
  tratamiento:   z.string().optional(),
  formula_direc: z.string().optional(),
  observaciones: z.string().optional(),
  incapacidad:   z.boolean().optional(),
  estado_a:      z.boolean().optional(),
});

export const updateAtencionSchema = createAtencionSchema.partial();
export type CreateAtencionDto = z.infer<typeof createAtencionSchema>;
export type UpdateAtencionDto = z.infer<typeof updateAtencionSchema>;