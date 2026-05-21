import { Router } from 'express';
import { ConsultorioController } from './consultorios_controller';
import { validate } from '../../middlewares/validate_middleware';
import { authMiddleware } from '../../middlewares/auth_middleware';
import { createConsultorioSchema, updateConsultorioSchema } from './consultorios_schema';

const router = Router();
const ctrl   = new ConsultorioController();

router.get('/',                authMiddleware, ctrl.getAll.bind(ctrl));
router.get('/sede/:sedeId',    authMiddleware, ctrl.getBySede.bind(ctrl));
router.get('/:id',             authMiddleware, ctrl.getById.bind(ctrl));
router.post('/',               authMiddleware, validate(createConsultorioSchema), ctrl.create.bind(ctrl));
router.put('/:id',             authMiddleware, validate(updateConsultorioSchema), ctrl.update.bind(ctrl));
router.delete('/:id',          authMiddleware, ctrl.delete.bind(ctrl));

export default router;