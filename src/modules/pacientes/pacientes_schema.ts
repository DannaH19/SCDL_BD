import { z } from 'zod';

export const createPacienteSchema = z.object({
<<<<<<< HEAD
  num_doc_p:   z.string().min(3).max(20),
  nom_p:       z.string().min(2).max(20),
  ape_p:       z.string().min(2).max(35),
  fecha_nac_p: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  telefono_p:  z.string().max(10).optional(),
  correo_p:    z.string().email().max(50).optional(),
  direc_p:     z.string().max(100).optional(),
  ID_tipo_doc: z.number().int().positive().optional(),
  ID_genero:   z.number().int().positive().optional(),
  ID_eps:      z.number().int().positive().optional(),
  ID_ciudad:   z.number().int().positive().optional(),
});

export const updatePacienteSchema = createPacienteSchema.partial();
=======
  num_doc_p:    z.string().min(3).max(20),
  nom_p:        z.string().min(2).max(20),
  ape_p:        z.string().min(2).max(35),
  fecha_nac_p:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  telefono_p:   z.string().max(10).optional(),
  correo_p:     z.string().email().max(50).optional(),
  direc_p:      z.string().max(100).optional(),
  ID_tipo_doc:  z.number().int().positive().optional(),
  ID_genero:    z.number().int().positive().optional(),
  ID_eps:       z.number().int().positive().optional(),
  ID_ciudad:    z.number().int().positive().optional(),
});

export const updatePacienteSchema = createPacienteSchema.partial();

>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
export type CreatePacienteDto = z.infer<typeof createPacienteSchema>;
export type UpdatePacienteDto = z.infer<typeof updatePacienteSchema>;