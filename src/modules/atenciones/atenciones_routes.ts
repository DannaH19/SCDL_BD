import { Router } from 'express';
import { AtencionController } from './atenciones_controller';
import { validate } from '../../middlewares/validate_middleware';
import { verificarToken } from '../../middlewares/auth_middleware';
import { createAtencionSchema, updateAtencionSchema } from './atenciones_schema';

const router = Router();
const ctrl   = new AtencionController();

router.get('/',             verificarToken, ctrl.getAll.bind(ctrl));
router.get('/:id',          verificarToken, ctrl.getById.bind(ctrl));
router.get('/cita/:citaId', verificarToken, ctrl.getByCita.bind(ctrl));
router.post('/',            verificarToken, validate(createAtencionSchema), ctrl.create.bind(ctrl));
router.put('/:id',          verificarToken, validate(updateAtencionSchema), ctrl.update.bind(ctrl));

export default router;