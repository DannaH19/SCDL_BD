import { Consultorio, ConsultorioAttributes } from './consultorios_model';
import { CreateConsultorioDto, UpdateConsultorioDto } from './consultorios_schema';

export class ConsultorioRepository {
  findAll()            { return Consultorio.findAll({ where: { disponible: true } }); }
  findBySede(id: number) { return Consultorio.findAll({ where: { id_sede: id, disponible: true } }); }
  findById(id: number) { return Consultorio.findByPk(id); }
  create(data: CreateConsultorioDto) { return Consultorio.create(data as ConsultorioAttributes); }
  async update(id: number, data: UpdateConsultorioDto) {
    const [a] = await Consultorio.update(data, { where: { id_consultorio: id } }); return a;
  }
  async softDelete(id: number) {
    const [a] = await Consultorio.update({ disponible: false }, { where: { id_consultorio: id } }); return a;
  }
}