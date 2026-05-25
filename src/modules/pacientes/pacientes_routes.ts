import { Router } from 'express';
import { PacienteController } from './pacientes_controller';
import { validate } from '../../middlewares/validate_middleware';
import { verificarToken } from '../../middlewares/auth_middleware';
import { createPacienteSchema, updatePacienteSchema } from './pacientes_schema';

const router = Router();
const ctrl   = new PacienteController();


router.get('/',     verificarToken, ctrl.getAll.bind(ctrl));
router.get('/:id',  verificarToken, ctrl.getById.bind(ctrl));
router.post('/',    verificarToken, validate(createPacienteSchema), ctrl.create.bind(ctrl));
router.put('/:id',  verificarToken, validate(updatePacienteSchema), ctrl.update.bind(ctrl));
router.delete('/:id', verificarToken, ctrl.delete.bind(ctrl));

export default router;