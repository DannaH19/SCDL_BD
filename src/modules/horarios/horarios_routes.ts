import { Router } from 'express';
import { HorarioController } from './horarios_controller';
import { validate } from '../../middlewares/validate_middleware';
import { verificarToken } from '../../middlewares/auth_middleware';
import { createHorarioSchema, updateHorarioSchema } from './horarios_schema';

const router = Router();
const ctrl   = new HorarioController();

router.get('/',                    verificarToken, ctrl.getAll.bind(ctrl));
router.get('/medico/:medicoId',    verificarToken, ctrl.getByMedico.bind(ctrl));
router.get('/:id',                 verificarToken, ctrl.getById.bind(ctrl));
router.post('/',                   verificarToken, validate(createHorarioSchema), ctrl.create.bind(ctrl));
router.put('/:id',                 verificarToken, validate(updateHorarioSchema), ctrl.update.bind(ctrl));
router.delete('/:id',              verificarToken, ctrl.delete.bind(ctrl));

export default router;