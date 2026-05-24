import { z } from 'zod';

export const createCitaSchema = z.object({
  fecha_c:         z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  hora_c:          z.string().regex(/^\d{2}:\d{2}$/),
  estado_c:        z.enum(['Agendada','Confirmada','Cancelada','Atendida','Inasistencia']).optional(),
  Motivo_consulta: z.string().max(150).optional(),
  observaciones:   z.string().optional(),
  ID_medico:       z.number().int().positive().optional(),
  ID_paciente:     z.number().int().positive().optional(),
  ID_horario:      z.number().int().positive().optional(),
  ID_usuario:      z.number().int().positive().optional(),
});

export const updateCitaSchema = z.object({
  estado_c:        z.enum(['Agendada','Confirmada','Cancelada','Atendida','Inasistencia']).optional(),
  Motivo_consulta: z.string().max(150).optional(),
  observaciones:   z.string().optional(),
});

export type CreateCitaDto = z.infer<typeof createCitaSchema>;
export type UpdateCitaDto = z.infer<typeof updateCitaSchema>;