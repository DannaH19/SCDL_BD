import { z } from 'zod';

export const createAtencionSchema = z.object({
  id_turno:            z.number().int().positive(),
  peso_kg:             z.number().positive().optional(),
  talla_cm:            z.number().positive().optional(),
  presion_arterial:    z.string().max(10).optional(),
  temperatura_c:       z.number().optional(),
  frecuencia_cardiaca: z.number().int().positive().optional(),
  saturacion_oxigeno:  z.number().min(0).max(100).optional(),
  observaciones:       z.string().optional(),
  fecha_atencion:      z.string().datetime(),
});

export const updateAtencionSchema = createAtencionSchema.partial();
export type CreateAtencionDto = z.infer<typeof createAtencionSchema>;
export type UpdateAtencionDto = z.infer<typeof updateAtencionSchema>;