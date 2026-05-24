import { z } from 'zod';

export const createHorarioSchema = z.object({
  id_medico:         z.number().int().positive(),
  id_sede:           z.number().int().positive(),
  id_consultorio:    z.number().int().positive().optional(),
  dia_semana:        z.number().int().min(0).max(6),
  hora_inicio:       z.string().regex(/^\d{2}:\d{2}$/, 'Formato HH:MM'),
  hora_fin:          z.string().regex(/^\d{2}:\d{2}$/, 'Formato HH:MM'),
  duracion_cita_min: z.number().int().min(5).max(120).default(20),
  cupo_maximo:       z.number().int().min(1),
});

export const updateHorarioSchema = createHorarioSchema.partial();
export type CreateHorarioDto = z.infer<typeof createHorarioSchema>;
export type UpdateHorarioDto = z.infer<typeof updateHorarioSchema>;