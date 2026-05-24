import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './auth.schema';

const repo = new AuthRepository();

const sha256 = (text: string) =>
  crypto.createHash('sha256').update(text).digest('hex');

export class AuthService {
  async login(data: LoginDto) {
    const usuario = await repo.findByUsername(data.username);

    if (!usuario || usuario.contraseña !== sha256(data.password)) {
      throw new Error('Credenciales incorrectas');
    }

    await repo.updateUltimoAcceso(usuario.Id_Usuario);

    const token = jwt.sign(
      {
        id:       usuario.Id_Usuario,
        username: usuario.username,
        rol:      usuario.ID_rol,
      },
      ENV.JWT_SECRET as string
    );

    return {
      message: 'Login exitoso',
      token,
      usuario: {
        id:       usuario.Id_Usuario,
        username: usuario.username,
        nombre:   usuario.Nom_comp,
        rol:      usuario.ID_rol,
      },
    };
  }
}