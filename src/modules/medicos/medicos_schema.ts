import { z } from 'zod';

export const createMedicoSchema = z.object({
  num_doc_m:       z.string().min(3).max(20),
  nom_m:           z.string().min(2).max(20),
  ape_m:           z.string().min(2).max(35),
  num_lic:         z.string().max(20).optional(),
  telefono_m:      z.string().max(10).optional(),
  correo_m:        z.string().email().max(50).optional(),
  direc_m:         z.string().max(100).optional(),
  ID_tipo_doc:     z.number().int().positive().optional(),
  ID_genero:       z.number().int().positive().optional(),
  ID_especialidad: z.number().int().positive().optional(),
  ID_ciudad:       z.number().int().positive().optional(),
});

export const updateMedicoSchema = createMedicoSchema.partial();
export type CreateMedicoDto = z.infer<typeof createMedicoSchema>;
export type UpdateMedicoDto = z.infer<typeof updateMedicoSchema>;