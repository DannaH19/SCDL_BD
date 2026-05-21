import { Router } from 'express';
import { SedeController } from './sedes_controller';
import { validate } from '../../middlewares/validate_middleware';
import { authMiddleware } from '../../middlewares/auth_middleware';
import { createSedeSchema, updateSedeSchema } from './sedes_schema';

const router = Router();
const ctrl   = new SedeController();

router.get('/',       authMiddleware, ctrl.getAll.bind(ctrl));
router.get('/:id',    authMiddleware, ctrl.getById.bind(ctrl));
router.post('/',      authMiddleware, validate(createSedeSchema), ctrl.create.bind(ctrl));
router.put('/:id',    authMiddleware, validate(updateSedeSchema), ctrl.update.bind(ctrl));
router.delete('/:id', authMiddleware, ctrl.delete.bind(ctrl));

export default router;