import { AtencionRepository } from './atenciones_repository';
import { CreateAtencionDto, UpdateAtencionDto } from './atenciones_schema';

const repo = new AtencionRepository();

export class AtencionService {
  getAll() {
    return repo.findAll();
  }

  async getById(id: number) {
    const a = await repo.findById(id);
    if (!a) throw new Error(`Atención con id ${id} no encontrada.`);
    return a;
  }

  async getByCita(id: number) {
    const a = await repo.findByCita(id);
    if (!a) throw new Error(`Atención para la cita ${id} no encontrada.`);
    return a;
  }

  async create(data: CreateAtencionDto) {
    const existe = await repo.findByCita(data.ID_cita);
    if (existe) throw new Error('Ya existe una atención para esta cita.');
    return repo.create(data);
  }

  async update(id: number, data: UpdateAtencionDto) {
    await this.getById(id);
    await repo.update(id, data);
    return repo.findById(id);
  }
}