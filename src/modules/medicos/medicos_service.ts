import { MedicoRepository } from './medicos_repository';
import { CreateMedicoDto, UpdateMedicoDto } from './medicos_schema';

const repo = new MedicoRepository();

export class MedicoService {
  getAll()                      { return repo.findAll(); }
  getByEspecialidad(id: number) { return repo.findByEspecialidad(id); }

  async getById(id: number) {
    const m = await repo.findById(id);
    if (!m) throw new Error(`Médico con id ${id} no encontrado.`);
    return m;
  }

  async create(data: CreateMedicoDto) {
    const existe = await repo.findByDocumento(data.num_doc_m);
    if (existe) throw new Error(`Ya existe un médico con documento ${data.num_doc_m}.`);
    return repo.create(data);
  }

  async update(id: number, data: UpdateMedicoDto) {
    await this.getById(id);
    await repo.update(id, data);
    return repo.findById(id);
  }
  async delete(id: number) {
    await this.getById(id);
    await repo.softDelete(id);
    return { message: 'Médico desactivado correctamente.' };
  }
}