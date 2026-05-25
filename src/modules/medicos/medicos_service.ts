import { MedicoRepository } from './medicos_repository';
import { CreateMedicoDto, UpdateMedicoDto } from './medicos_schema';

const repo = new MedicoRepository();

export class MedicoService {
<<<<<<< HEAD
  getAll()                      { return repo.findAll(); }
  getByEspecialidad(id: number) { return repo.findByEspecialidad(id); }

=======
  getAll()                        { return repo.findAll(); }
  getByEspecialidad(id: number)   { return repo.findByEspecialidad(id); }
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
  async getById(id: number) {
    const m = await repo.findById(id);
    if (!m) throw new Error(`Médico con id ${id} no encontrado.`);
    return m;
  }
<<<<<<< HEAD

  async create(data: CreateMedicoDto) {
    const existe = await repo.findByDocumento(data.num_doc_m);
    if (existe) throw new Error(`Ya existe un médico con documento ${data.num_doc_m}.`);
    return repo.create(data);
  }

=======
  async create(data: CreateMedicoDto) {
    const existe = await repo.findByDocumento(data.numero_documento);
    if (existe) throw new Error(`Ya existe un médico con documento ${data.numero_documento}.`);
    return repo.create(data);
  }
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
  async update(id: number, data: UpdateMedicoDto) {
    await this.getById(id);
    await repo.update(id, data);
    return repo.findById(id);
  }
<<<<<<< HEAD

=======
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
  async delete(id: number) {
    await this.getById(id);
    await repo.softDelete(id);
    return { message: 'Médico desactivado correctamente.' };
  }
}