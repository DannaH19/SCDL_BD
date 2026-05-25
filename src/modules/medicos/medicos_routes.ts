import { Router } from 'express';
import { MedicoController } from './medicos_controller';
import { validate } from '../../middlewares/validate_middleware';
import { verificarToken } from '../../middlewares/auth_middleware';
import { createMedicoSchema, updateMedicoSchema } from './medicos_schema';

const router = Router();
const ctrl   = new MedicoController();

router.get('/',                        verificarToken, ctrl.getAll.bind(ctrl));
router.get('/especialidad/:espId',     verificarToken, ctrl.getByEspecialidad.bind(ctrl));
router.get('/:id',                     verificarToken, ctrl.getById.bind(ctrl));
router.post('/',                       verificarToken, validate(createMedicoSchema), ctrl.create.bind(ctrl));
router.put('/:id',                     verificarToken, validate(updateMedicoSchema), ctrl.update.bind(ctrl));
router.delete('/:id',                  verificarToken, ctrl.delete.bind(ctrl));

export default router;