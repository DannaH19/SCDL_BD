import { Router } from 'express';
import { ConsultorioController } from './consultorios_controller';
import { validate } from '../../middlewares/validate_middleware';
import { verificarToken } from '../../middlewares/auth_middleware';
import { createConsultorioSchema, updateConsultorioSchema } from './consultorios_schema';

const router = Router();
const ctrl   = new ConsultorioController();

router.get('/',                verificarToken, ctrl.getAll.bind(ctrl));
router.get('/sede/:sedeId',    verificarToken, ctrl.getBySede.bind(ctrl));
router.get('/:id',             verificarToken, ctrl.getById.bind(ctrl));
router.post('/',               verificarToken, validate(createConsultorioSchema), ctrl.create.bind(ctrl));
router.put('/:id',             verificarToken, validate(updateConsultorioSchema), ctrl.update.bind(ctrl));
router.delete('/:id',          verificarToken, ctrl.delete.bind(ctrl));

export default router;