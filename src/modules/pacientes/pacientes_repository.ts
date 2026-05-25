import { Op } from 'sequelize'; 
import { Paciente, PacienteAttributes } from './pacientes_model';
import { CreatePacienteDto, UpdatePacienteDto } from './pacientes_schema';

export class PacienteRepository {
  findAll() {
    return Paciente.findAll({ where: { estado_p: true } });
  }

  findById(id: number) {
    return Paciente.findByPk(id);
  }

  findByDocumento(documentoPaciente: string) {
    return Paciente.findAll({ 
      where: { 
        num_doc_p: documentoPaciente, 
        estado_p: true 
      } 
    });
  }

  findByNombreCompleto(nombreCompleto: string) {
    const primeraPalabra = nombreCompleto.split(' ')[0] || '';

    return Paciente.findAll({
      where: {
        nom_p: {
          [Op.like]: `%${primeraPalabra}%`
        },
        estado_p: true
      }
    });
  }

  // 🚀 AGREGA ESTA FUNCIÓN AQUÍ:
  findByCorreo(correo: string) {
    return Paciente.findAll({
      where: {
        correo_p: correo,
        estado_p: true
      }
    });
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