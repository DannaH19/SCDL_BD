import { Router } from 'express';
import { HorarioController } from './horarios_controller';
import { validate } from '../../middlewares/validate_middleware';
import { authMiddleware } from '../../middlewares/auth_middleware';
import { createHorarioSchema, updateHorarioSchema } from './horarios_schema';

const router = Router();
const ctrl   = new HorarioController();

router.get('/',                    authMiddleware, ctrl.getAll.bind(ctrl));
router.get('/medico/:medicoId',    authMiddleware, ctrl.getByMedico.bind(ctrl));
router.get('/:id',                 authMiddleware, ctrl.getById.bind(ctrl));
router.post('/',                   authMiddleware, validate(createHorarioSchema), ctrl.create.bind(ctrl));
router.put('/:id',                 authMiddleware, validate(updateHorarioSchema), ctrl.update.bind(ctrl));
router.delete('/:id',              authMiddleware, ctrl.delete.bind(ctrl));

export default router;