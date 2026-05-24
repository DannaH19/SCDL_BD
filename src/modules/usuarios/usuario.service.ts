import { UsuarioRepository } from './usuario.repository';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.schema';

const repo = new UsuarioRepository();

export class UsuarioService {
  getAll() {
    return repo.findAll();
  }

  async getById(id: number) {
    const usuario = await repo.findById(id);
    if (!usuario) throw new Error(`Usuario con id ${id} no encontrado.`);
    return usuario;
  }

  async create(data: CreateUsuarioDto) {
    const existe = await repo.findByUsername(data.username);
    if (existe) throw new Error('El username ya está en uso.');
    return repo.create(data);
  }

  async update(id: number, data: UpdateUsuarioDto) {
    await this.getById(id);
    await repo.update(id, data);
    return repo.findById(id);
  }

  async desactivar(id: number) {
    await this.getById(id);
    await repo.desactivar(id);
    return { message: 'Usuario desactivado correctamente' };
  }
}