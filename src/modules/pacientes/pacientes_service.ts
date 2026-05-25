import { PacienteRepository } from './pacientes_repository';
import { CreatePacienteDto, UpdatePacienteDto } from './pacientes_schema';

const repo = new PacienteRepository();

export class PacienteService {
  getAll() {
    return repo.findAll();
  }
  async getByCorreo(correo: string) {
    // 🟢 Llamamos de forma limpia al nuevo método estructurado en el repositorio
    return await repo.findByCorreo(correo);
  }
  async getByUsuario(nombreCompleto: string) {
    return await repo.findByNombreCompleto(nombreCompleto);
  }

  async getByDocumento(documento: string) {
    return await repo.findByDocumento(documento);
  }
  
  async getById(id: number) {
    const paciente = await repo.findById(id);
    if (!paciente) throw new Error(`Paciente con id ${id} no encontrado.`);
    return paciente;
  }

  async create(data: CreatePacienteDto) {
    // Como findByDocumento usa findAll, nos devuelve una lista. Validamos si no está vacía.
    const existe = await repo.findByDocumento(data.num_doc_p);
    if (existe && existe.length > 0) {
      throw new Error(`Ya existe un paciente con documento ${data.num_doc_p}.`);
    }
    return repo.create(data);
  }

  async update(id: number, data: UpdatePacienteDto) {
    await this.getById(id);
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