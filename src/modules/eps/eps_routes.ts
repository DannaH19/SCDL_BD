import { Router } from 'express';
import { EpsController } from './eps_controller';
import { validate } from '../../middlewares/validate_middleware';
import { verificarToken } from '../../middlewares/auth_middleware';
import { createEpsSchema, updateEpsSchema } from './eps_schema';

const router = Router();
const ctrl   = new EpsController();

router.get('/',       verificarToken, ctrl.getAll.bind(ctrl));
router.get('/:id',    verificarToken, ctrl.getById.bind(ctrl));
router.post('/',      verificarToken, validate(createEpsSchema), ctrl.create.bind(ctrl));
router.put('/:id',    verificarToken, validate(updateEpsSchema), ctrl.update.bind(ctrl));
router.delete('/:id', verificarToken, ctrl.delete.bind(ctrl));

export default router;