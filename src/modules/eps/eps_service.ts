import { EpsRepository } from './eps_repository';
import { CreateEpsDto, UpdateEpsDto } from './eps_schema';

const repo = new EpsRepository();

export class EpsService {
  getAll() {
    return repo.findAll();
  }

  async getById(id: number) {
    const eps = await repo.findById(id);
    if (!eps) throw new Error(`EPS con id ${id} no encontrada.`);
    return eps;
  }

  async create(data: CreateEpsDto) {
    const existe = await repo.findByNit(data.NIT);
    if (existe) throw new Error(`Ya existe una EPS con NIT ${data.NIT}.`);
    return repo.create(data);
  }

  async update(id: number, data: UpdateEpsDto) {
    await this.getById(id);
    await repo.update(id, data);
    return repo.findById(id);
  }

  async delete(id: number) {
    await this.getById(id);
    await repo.softDelete(id);
    return { message: 'EPS desactivada correctamente.' };
  }
}