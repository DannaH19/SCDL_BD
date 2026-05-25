import { Consultorio, ConsultorioAttributes } from './consultorios_model';
import { CreateConsultorioDto, UpdateConsultorioDto } from './consultorios_schema';

export class ConsultorioRepository {
  findAll()              { return Consultorio.findAll({ where: { Estado_c: true } }); }
  findBySede(id: number) { return Consultorio.findAll({ where: { ID_sede: id, Estado_c: true } }); }
  findById(id: number)   { return Consultorio.findByPk(id); }
  create(data: CreateConsultorioDto) { return Consultorio.create(data as ConsultorioAttributes); }
  async update(id: number, data: UpdateConsultorioDto) {
    const [a] = await Consultorio.update(data, { where: { ID_consultorio: id } }); return a;
  }
  async softDelete(id: number) {
    const [a] = await Consultorio.update({ Estado_c: false }, { where: { ID_consultorio: id } }); return a;
  }
}