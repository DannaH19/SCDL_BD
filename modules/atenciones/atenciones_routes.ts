import { Router } from 'express';
import { AtencionController } from './atenciones_controller';
import { validate } from '../../middlewares/validate_middleware';
import { authMiddleware } from '../../middlewares/auth_middleware';
import { createAtencionSchema, updateAtencionSchema } from './atenciones_schema';

const router = Router();
const ctrl   = new AtencionController();

router.get('/',                  authMiddleware, ctrl.getAll.bind(ctrl));
router.get('/turno/:turnoId',    authMiddleware, ctrl.getByTurno.bind(ctrl));
router.get('/:id',               authMiddleware, ctrl.getById.bind(ctrl));
router.post('/',                 authMiddleware, validate(createAtencionSchema), ctrl.create.bind(ctrl));
router.put('/:id',               authMiddleware, validate(updateAtencionSchema), ctrl.update.bind(ctrl));

export default router;