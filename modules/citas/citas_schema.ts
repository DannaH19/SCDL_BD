import { z } from 'zod';

export const createCitaSchema = z.object({
  id_paciente:         z.number().int().positive(),
  id_medico:           z.number().int().positive(),
  id_sede:             z.number().int().positive(),
  id_consultorio:      z.number().int().positive().optional(),
  id_tipo_consulta:    z.number().int().positive(),
  id_horario:          z.number().int().positive(),
  fecha_cita:          z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  hora_cita:           z.string().regex(/^\d{2}:\d{2}$/),
  motivo_consulta:     z.string().max(500).optional(),
  numero_autorizacion: z.string().max(30).optional(),
  canal_agendamiento:  z.enum(['Presencial','Web','App','Telefónico']).default('Presencial'),
  creado_por:          z.number().int().positive(),
});

export const updateCitaSchema = z.object({
  estado:          z.enum(['Pendiente','Confirmada','Cancelada','Atendida','No asistió']).optional(),
  motivo_consulta: z.string().max(500).optional(),
});

export type CreateCitaDto = z.infer<typeof createCitaSchema>;
export type UpdateCitaDto = z.infer<typeof updateCitaSchema>;