import { PacienteRepository } from './pacientes_repository';
import { CreatePacienteDto, UpdatePacienteDto } from './pacientes_schema';

const repo = new PacienteRepository();

export class PacienteService {
  getAll() {
    return repo.findAll();
  }

  async getById(id: number) {
    const paciente = await repo.findById(id);
    if (!paciente) throw new Error(`Paciente con id ${id} no encontrado.`);
    return paciente;
  }

  async create(data: CreatePacienteDto) {
<<<<<<< HEAD
    const existe = await repo.findByDocumento(data.num_doc_p);
    if (existe) throw new Error(`Ya existe un paciente con documento ${data.num_doc_p}.`);
=======
    const existe = await repo.findByDocumento(data.numero_documento);
    if (existe) throw new Error(`Ya existe un paciente con documento ${data.numero_documento}.`);
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
    return repo.create(data);
  }

  async update(id: number, data: UpdatePacienteDto) {
<<<<<<< HEAD
    await this.getById(id);
=======
    await this.getById(id); // lanza error si no existe
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
    const affected = await repo.update(id, data);
    if (affected === 0) throw new Error('No se realizaron cambios.');
    return repo.findById(id);
  }

  async delete(id: number) {
    await this.getById(id);
    await repo.softDelete(id);
    return { message: 'Paciente desactivado correctamente.' };
  }
}