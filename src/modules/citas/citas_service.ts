import { CitaRepository } from './citas_repository';
import { CreateCitaDto, UpdateCitaDto } from './citas_schema';

const repo = new CitaRepository();

export class CitaService {
  getAll()                  { return repo.findAll(); }
  getByPaciente(id: number) { return repo.findByPaciente(id); }
  getByMedico(id: number)   { return repo.findByMedico(id); }

  async getById(id: number) {
    const c = await repo.findById(id);
    if (!c) throw new Error(`Cita con id ${id} no encontrada.`);
    return c;
  }

  create(data: CreateCitaDto) { return repo.create(data); }

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