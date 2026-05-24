import { z } from 'zod';

export const createPacienteSchema = z.object({
  id_tipo_doc:      z.number().int().positive(),
  numero_documento: z.string().min(5).max(20),
  primer_nombre:    z.string().min(2).max(40),
  segundo_nombre:   z.string().max(40).optional(),
  primer_apellido:  z.string().min(2).max(40),
  segundo_apellido: z.string().max(40).optional(),
  fecha_nacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato: YYYY-MM-DD'),
  genero:           z.enum(['M', 'F', 'O']),
  telefono:         z.string().max(15).optional(),
  correo:           z.string().email().max(80).optional(),
  direccion:        z.string().max(120).optional(),
  id_ciudad:        z.number().int().positive().optional(),
  id_eps:           z.number().int().positive(),
});

export const updatePacienteSchema = createPacienteSchema.partial();

export type CreatePacienteDto = z.infer<typeof createPacienteSchema>;
export type UpdatePacienteDto = z.infer<typeof updatePacienteSchema>;