import { z } from 'zod';

export const createMedicoSchema = z.object({
  id_tipo_doc:       z.number().int().positive(),
  numero_documento:  z.string().min(5).max(20),
  registro_medico:   z.string().min(3).max(20),
  primer_nombre:     z.string().min(2).max(40),
  segundo_nombre:    z.string().max(40).optional(),
  primer_apellido:   z.string().min(2).max(40),
  segundo_apellido:  z.string().max(40).optional(),
  id_especialidad:   z.number().int().positive(),
  id_sede_principal: z.number().int().positive(),
  telefono:          z.string().max(15).optional(),
  correo:            z.string().email().optional(),
});

export const updateMedicoSchema = createMedicoSchema.partial();
export type CreateMedicoDto = z.infer<typeof createMedicoSchema>;
export type UpdateMedicoDto = z.infer<typeof updateMedicoSchema>;