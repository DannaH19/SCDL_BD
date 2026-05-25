import { CitaRepository } from './citas_repository';
import { CreateCitaDto, UpdateCitaDto } from './citas_schema';

const repo = new CitaRepository();

export class CitaService {
  getAll() { 
    return repo.findAll(); 
  }

  // Se mantiene para compatibilidad con llamadas que pasan el ID del paciente directo
  getByPaciente(id: number) { 
    return repo.findByPaciente(id); 
  }

  getByMedico(id: number) { 
    return repo.findByMedico(id); 
  }

  // 🚀 ACTUALIZADO: Filtra usando el ID del paciente (la lógica correcta para la BD)
  async getByUsuarioId(usuarioId: number) {
    return await repo.findByUsuarioIdDirecto(usuarioId);
  }

  // 🚀 ACTUALIZADO: Filtra usando el ID del médico
  async getByMedicoUsuarioId(usuarioId: number) {
    return await repo.findByMedicoUsuarioIdDirecto(usuarioId);
  }

  async getById(id: number) {
    const c = await repo.findById(id);
    if (!c) throw new Error(`Cita con id ${id} no encontrada.`);
    return c;
  }

  create(data: CreateCitaDto) { 
    return repo.create(data); 
  }

  async update(id: number, data: UpdateCitaDto) {
    await this.getById(id);
    await repo.update(id, data);
    return repo.findById(id);
  }

  async cancelar(id: number) {
    await this.getById(id);
    await repo.update(id, { estado_c: 'Cancelada' });
    return { message: 'Cita cancelada.' };
  }
}