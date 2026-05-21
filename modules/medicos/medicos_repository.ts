import { Medico, MedicoAttributes } from './medicos_model';
import { CreateMedicoDto, UpdateMedicoDto } from './medicos_schema';

export class MedicoRepository {
  findAll()            { return Medico.findAll({ where: { activo: true } }); }
  findById(id: number) { return Medico.findByPk(id); }
  findByDocumento(doc: string) { return Medico.findOne({ where: { numero_documento: doc } }); }
  findByEspecialidad(id: number) { return Medico.findAll({ where: { id_especialidad: id, activo: true } }); }
  create(data: CreateMedicoDto) { return Medico.create(data as MedicoAttributes); }
  async update(id: number, data: UpdateMedicoDto) {
    const [a] = await Medico.update(data, { where: { id_medico: id } }); return a;
  }
  async softDelete(id: number) {
    const [a] = await Medico.update({ activo: false }, { where: { id_medico: id } }); return a;
  }
}