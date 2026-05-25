import { Router } from 'express';
import { CitaController } from './citas_controller';
import { validate } from '../../middlewares/validate_middleware';
import { verificarToken } from '../../middlewares/auth_middleware';
import { createCitaSchema, updateCitaSchema } from './citas_schema';

const router = Router();
const ctrl   = new CitaController();

router.get('/',                        verificarToken, ctrl.getAll.bind(ctrl));
router.get('/paciente/:pacienteId',    verificarToken, ctrl.getByPaciente.bind(ctrl));
router.get('/medico/:medicoId',        verificarToken, ctrl.getByMedico.bind(ctrl));
router.get('/:id',                     verificarToken, ctrl.getById.bind(ctrl));
router.post('/',                       verificarToken, validate(createCitaSchema), ctrl.create.bind(ctrl));
router.put('/:id',                     verificarToken, validate(updateCitaSchema), ctrl.update.bind(ctrl));
router.patch('/:id/cancelar',          verificarToken, ctrl.cancelar.bind(ctrl));

export default router;