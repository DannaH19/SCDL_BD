import { Router } from 'express';
import { CitaController } from './citas_controller';
import { validate } from '../../middlewares/validate_middleware';
import { authMiddleware } from '../../middlewares/auth_middleware';
import { createCitaSchema, updateCitaSchema } from './citas_schema';

const router = Router();
const ctrl   = new CitaController();

router.get('/',                        authMiddleware, ctrl.getAll.bind(ctrl));
router.get('/paciente/:pacienteId',    authMiddleware, ctrl.getByPaciente.bind(ctrl));
router.get('/medico/:medicoId',        authMiddleware, ctrl.getByMedico.bind(ctrl));
router.get('/:id',                     authMiddleware, ctrl.getById.bind(ctrl));
router.post('/',                       authMiddleware, validate(createCitaSchema), ctrl.create.bind(ctrl));
router.put('/:id',                     authMiddleware, validate(updateCitaSchema), ctrl.update.bind(ctrl));
router.patch('/:id/cancelar',          authMiddleware, ctrl.cancelar.bind(ctrl));

export default router;