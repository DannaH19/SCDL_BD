import { z } from 'zod';

export const createRemisionSchema = z.object({
  id_atencion:             z.number().int().positive(),
  id_especialidad_destino: z.number().int().positive(),
  motivo_remision:         z.string().min(10),
  prioridad:               z.enum(['Normal','Urgente','Prioritaria']).default('Normal'),
  fecha_remision:          z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  vigencia_dias:           z.number().int().min(1).default(30),
});

export const updateRemisionSchema = z.object({
  estado: z.enum(['Pendiente','Agendada','Vencida']).optional(),
});

export type CreateRemisionDto = z.infer<typeof createRemisionSchema>;
export type UpdateRemisionDto = z.infer<typeof updateRemisionSchema>;