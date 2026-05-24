import { HorarioRepository } from './horarios_repository';
import { CreateHorarioDto, UpdateHorarioDto } from './horarios_schema';

const repo = new HorarioRepository();

export class HorarioService {
  getAll()                   { return repo.findAll(); }
  getByMedico(id: number)    { return repo.findByMedico(id); }
  async getById(id: number) {
    const h = await repo.findById(id);
    if (!h) throw new Error(`Horario con id ${id} no encontrado.`);
    return h;
  }
  create(data: CreateHorarioDto) { return repo.create(data); }
  async update(id: number, data: UpdateHorarioDto) {
    await this.getById(id);
    await repo.update(id, data);
    return repo.findById(id);
  }
  async delete(id: number) {
    await this.getById(id);
    await repo.softDelete(id);
    return { message: 'Horario desactivado.' };
  }
}