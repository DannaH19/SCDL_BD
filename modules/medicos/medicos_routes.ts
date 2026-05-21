import { Router } from 'express';
import { MedicoController } from './medicos_controller';
import { validate } from '../../middlewares/validate_middleware';
import { authMiddleware } from '../../middlewares/auth_middleware';
import { createMedicoSchema, updateMedicoSchema } from './medicos_schema';

const router = Router();
const ctrl   = new MedicoController();

router.get('/',                        authMiddleware, ctrl.getAll.bind(ctrl));
router.get('/especialidad/:espId',     authMiddleware, ctrl.getByEspecialidad.bind(ctrl));
router.get('/:id',                     authMiddleware, ctrl.getById.bind(ctrl));
router.post('/',                       authMiddleware, validate(createMedicoSchema), ctrl.create.bind(ctrl));
router.put('/:id',                     authMiddleware, validate(updateMedicoSchema), ctrl.update.bind(ctrl));
router.delete('/:id',                  authMiddleware, ctrl.delete.bind(ctrl));

export default router;