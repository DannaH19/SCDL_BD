import { Router } from 'express';
import { PacienteController } from './pacientes_controller';
import { validate } from '../../middlewares/validate_middleware';
import { authMiddleware } from '../../middlewares/auth_middleware';
import { createPacienteSchema, updatePacienteSchema } from './pacientes_schema';

const router = Router();
const ctrl   = new PacienteController();


router.get('/',     authMiddleware, ctrl.getAll.bind(ctrl));
router.get('/:id',  authMiddleware, ctrl.getById.bind(ctrl));
router.post('/',    authMiddleware, validate(createPacienteSchema), ctrl.create.bind(ctrl));
router.put('/:id',  authMiddleware, validate(updatePacienteSchema), ctrl.update.bind(ctrl));
router.delete('/:id', authMiddleware, ctrl.delete.bind(ctrl));

export default router;