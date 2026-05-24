import { Cita, CitaAttributes } from './citas_model';
import { CreateCitaDto, UpdateCitaDto } from './citas_schema';

export class CitaRepository {
  findAll()              { return Cita.findAll(); }
  findById(id: number)   { return Cita.findByPk(id); }
  findByPaciente(id: number) { return Cita.findAll({ where: { ID_paciente: id } }); }
  findByMedico(id: number)   { return Cita.findAll({ where: { ID_medico: id } }); }
  create(data: CreateCitaDto) { return Cita.create(data as CitaAttributes); }
  async update(id: number, data: UpdateCitaDto) {
    const [a] = await Cita.update(data, { where: { ID_cita: id } }); return a;
  }
}