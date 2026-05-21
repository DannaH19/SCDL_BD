import { Paciente, PacienteAttributes } from '../pacientes/pacientes_model';
import { CreatePacienteDto, UpdatePacienteDto } from '../pacientes/pacientes_schema';

export class PacienteRepository {
  findAll() {
    return Paciente.findAll({ where: { activo: true } });
  }

  findById(id: number) {
    return Paciente.findByPk(id);
  }

  findByDocumento(numero: string) {
    return Paciente.findOne({ where: { numero_documento: numero } });
  }

  create(data: CreatePacienteDto) {
    return Paciente.create({
        ...data,
        fecha_nacimiento: new Date(data.fecha_nacimiento), 
    } as any); 
  }
  async update(id: number, data: UpdatePacienteDto) {
  const [affected] = await Paciente.update(data as any, { 
    where: { id_paciente: id } 
  });
  return affected;
  }

  async softDelete(id: number) {
    const [affected] = await Paciente.update({ activo: false }, { where: { id_paciente: id } });
    return affected;
  }
}