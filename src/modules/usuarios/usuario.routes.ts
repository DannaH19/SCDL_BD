import { Router } from 'express';
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from './usuario.controller';
import { verificarToken, verificarRol } from '../../middlewares/auth_middleware';

const router = Router();

// Solo Superadmin y Administrador pueden gestionar usuarios
router.get('/',          verificarToken, verificarRol(1, 2), getUsuarios);
router.get('/:id',       verificarToken, verificarRol(1, 2), getUsuarioById);
router.post('/',         verificarToken, verificarRol(1),    createUsuario);
router.put('/:id',       verificarToken, verificarRol(1, 2), updateUsuario);
router.delete('/:id',    verificarToken, verificarRol(1),    deleteUsuario);

export default router;