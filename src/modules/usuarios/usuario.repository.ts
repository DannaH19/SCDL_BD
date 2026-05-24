import Usuario from './usuario.model';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.schema';
import crypto from 'crypto';

const sha256 = (text: string) =>
  crypto.createHash('sha256').update(text).digest('hex');

export class UsuarioRepository {
  findAll() {
    return Usuario.findAll({
      attributes: { exclude: ['contraseña'] },
    });
  }

  findById(id: number) {
    return Usuario.findByPk(id, {
      attributes: { exclude: ['contraseña'] },
    });
  }

  findByUsername(username: string) {
    return Usuario.findOne({ where: { username } });
  }

  create(data: CreateUsuarioDto) {
    return Usuario.create({
      ...data,
      contraseña: sha256(data.contraseña),
      estado_u: true,
    } as any);
  }

  update(id: number, data: UpdateUsuarioDto) {
    return Usuario.update(data as any, { where: { Id_Usuario: id } });
  }

  desactivar(id: number) {
    return Usuario.update({ estado_u: false }, { where: { Id_Usuario: id } });
  }
}