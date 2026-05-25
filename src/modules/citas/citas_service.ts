import { CitaRepository } from './citas_repository';
import { CreateCitaDto, UpdateCitaDto } from './citas_schema';

const repo = new CitaRepository();

export class CitaService {
<<<<<<< HEAD
  getAll()                  { return repo.findAll(); }
  getByPaciente(id: number) { return repo.findByPaciente(id); }
  getByMedico(id: number)   { return repo.findByMedico(id); }

=======
  getAll()                     { return repo.findAll(); }
  getByPaciente(id: number)    { return repo.findByPaciente(id); }
  getByMedico(id: number)      { return repo.findByMedico(id); }
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
  async getById(id: number) {
    const c = await repo.findById(id);
    if (!c) throw new Error(`Cita con id ${id} no encontrada.`);
    return c;
  }
<<<<<<< HEAD

  create(data: CreateCitaDto) { return repo.create(data); }

=======
  create(data: CreateCitaDto) { return repo.create(data); }
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
  async update(id: number, data: UpdateCitaDto) {
    await this.getById(id);
    await repo.update(id, data);
    return repo.findById(id);
  }
<<<<<<< HEAD

  async cancelar(id: number) {
    await this.getById(id);
    await repo.update(id, { estado_c: 'Cancelada' });
=======
  async cancelar(id: number) {
    await this.getById(id);
    await repo.update(id, { estado: 'Cancelada' });
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
    return { message: 'Cita cancelada.' };
  }
}