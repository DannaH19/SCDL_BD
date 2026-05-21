import { Router } from 'express';
import { RemisionController } from './remisiones_controller';
import { validate } from '../../middlewares/validate_middleware';
import { authMiddleware } from '../../middlewares/auth_middleware';
import { createRemisionSchema, updateRemisionSchema } from './remisiones_schema';

const router = Router();
const ctrl   = new RemisionController();

router.get('/',                      authMiddleware, ctrl.getAll.bind(ctrl));
router.get('/atencion/:atencionId',   authMiddleware, ctrl.getByAtencion.bind(ctrl));
router.get('/:id',                   authMiddleware, ctrl.getById.bind(ctrl));
router.post('/',                     authMiddleware, validate(createRemisionSchema), ctrl.create.bind(ctrl));
router.put('/:id',                   authMiddleware, validate(updateRemisionSchema), ctrl.update.bind(ctrl));

export default router;