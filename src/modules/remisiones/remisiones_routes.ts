import { Router } from 'express';
import { RemisionController } from './remisiones_controller';
import { validate } from '../../middlewares/validate_middleware';
import { verificarToken } from '../../middlewares/auth_middleware';
import { createRemisionSchema, updateRemisionSchema } from './remisiones_schema';

const router = Router();
const ctrl   = new RemisionController();

router.get('/',                      verificarToken, ctrl.getAll.bind(ctrl));
router.get('/atencion/:atencionId',  verificarToken, ctrl.getByAtencion.bind(ctrl));
router.get('/:id',                   verificarToken, ctrl.getById.bind(ctrl));
router.post('/',                     verificarToken, validate(createRemisionSchema), ctrl.create.bind(ctrl));
router.put('/:id',                   verificarToken, validate(updateRemisionSchema), ctrl.update.bind(ctrl));

export default router;