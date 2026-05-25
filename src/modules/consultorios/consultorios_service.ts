import { ConsultorioRepository } from './consultorios_repository';
import { CreateConsultorioDto, UpdateConsultorioDto } from './consultorios_schema';

const repo = new ConsultorioRepository();

export class ConsultorioService {
  getAll()                   { return repo.findAll(); }
  getBySede(id: number)      { return repo.findBySede(id); }
  async getById(id: number) {
    const c = await repo.findById(id);
    if (!c) throw new Error(`Consultorio con id ${id} no encontrado.`);
    return c;
  }
  create(data: CreateConsultorioDto) { return repo.create(data); }
  async update(id: number, data: UpdateConsultorioDto) {
    await this.getById(id);
    await repo.update(id, data);
    return repo.findById(id);
  }
  async delete(id: number) {
    await this.getById(id);
    await repo.softDelete(id);
    return { message: 'Consultorio deshabilitado correctamente.' };
  }
}