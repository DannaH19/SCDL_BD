import { Router } from 'express';
import { SedeController } from './sedes_controller';
import { validate } from '../../middlewares/validate_middleware';
import { verificarToken } from '../../middlewares/auth_middleware';
import { createSedeSchema, updateSedeSchema } from './sedes_schema';

const router = Router();
const ctrl   = new SedeController();

router.get('/',       verificarToken, ctrl.getAll.bind(ctrl));
router.get('/:id',    verificarToken, ctrl.getById.bind(ctrl));
router.post('/',      verificarToken, validate(createSedeSchema), ctrl.create.bind(ctrl));
router.put('/:id',    verificarToken, validate(updateSedeSchema), ctrl.update.bind(ctrl));
router.delete('/:id', verificarToken, ctrl.delete.bind(ctrl));

export default router;