import { RemisionRepository } from './remisiones_repository';
import { CreateRemisionDto, UpdateRemisionDto } from './remisiones_schema';

const repo = new RemisionRepository();

export class RemisionService {
  getAll()                   { return repo.findAll(); }
  getByAtencion(id: number)  { return repo.findByAtencion(id); }
  async getById(id: number) {
    const r = await repo.findById(id);
    if (!r) throw new Error(`Remisión con id ${id} no encontrada.`);
    return r;
  }
  create(data: CreateRemisionDto) { return repo.create(data); }
  async update(id: number, data: UpdateRemisionDto) {
    await this.getById(id);
    await repo.update(id, data);
    return repo.findById(id);
  }
}