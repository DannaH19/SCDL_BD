import { z } from 'zod';

export const createHorarioSchema = z.object({
  dia_semana:    z.enum(['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']),
  hora_inicio:   z.string().regex(/^\d{2}:\d{2}$/),
  hora_fin:      z.string().regex(/^\d{2}:\d{2}$/),
  fecha_i_vigen: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  fecha_f_vigen: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  ID_medico:     z.number().int().positive().optional(),
  ID_consultorio:z.number().int().positive().optional(),
});

export const updateHorarioSchema = createHorarioSchema.partial();
export type CreateHorarioDto = z.infer<typeof createHorarioSchema>;
export type UpdateHorarioDto = z.infer<typeof updateHorarioSchema>;