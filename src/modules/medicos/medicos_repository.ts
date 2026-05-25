import { Medico, MedicoAttributes } from './medicos_model';
import { CreateMedicoDto, UpdateMedicoDto } from './medicos_schema';

export class MedicoRepository {
  findAll()            { return Medico.findAll({ where: { estado_m: true } }); }
  findById(id: number) { return Medico.findByPk(id); }
  findByDocumento(doc: string) { return Medico.findOne({ where: { num_doc_m: doc } }); }
  findByEspecialidad(id: number) { return Medico.findAll({ where: { ID_especialidad: id, estado_m: true } }); }
  create(data: CreateMedicoDto) { return Medico.create(data as MedicoAttributes); }
  async update(id: number, data: UpdateMedicoDto) {
    const [a] = await Medico.update(data, { where: { ID_medico: id } }); return a;
  }
  async softDelete(id: number) {
    const [a] = await Medico.update({ estado_m: false }, { where: { ID_medico: id } }); return a;
  }
}