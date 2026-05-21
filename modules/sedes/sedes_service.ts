import { SedeRepository } from './sedes_repository';
import { CreateSedeDto, UpdateSedeDto } from './sedes_schema';

const repo = new SedeRepository();

export class SedeService {
  getAll() { return repo.findAll(); }
  async getById(id: number) {
    const s = await repo.findById(id);
    if (!s) throw new Error(`Sede con id ${id} no encontrada.`);
    return s;
  }
  create(data: CreateSedeDto) { return repo.create(data); }
  async update(id: number, data: UpdateSedeDto) {
    await this.getById(id);
    await repo.update(id, data);
    return repo.findById(id);
  }
  async delete(id: number) {
    await this.getById(id);
    await repo.softDelete(id);
    return { message: 'Sede desactivada correctamente.' };
  }
}