import { Paciente, PacienteAttributes } from './pacientes_model';
import { CreatePacienteDto, UpdatePacienteDto } from './pacientes_schema';

export class PacienteRepository {
  findAll() {
    return Paciente.findAll({ where: { estado_p: true } });
  }

  findById(id: number) {
    return Paciente.findByPk(id);
  }

  findByDocumento(numero: string) {
    return Paciente.findOne({ where: { num_doc_p: numero } });
  }

  create(data: CreatePacienteDto) {
    return Paciente.create(data as PacienteAttributes);
  }

  async update(id: number, data: UpdatePacienteDto) {
    const [affected] = await Paciente.update(data, { where: { ID_Paciente: id } });
    return affected;
  }

  async softDelete(id: number) {
    const [affected] = await Paciente.update({ estado_p: false }, { where: { ID_Paciente: id } });
    return affected;
  }
}