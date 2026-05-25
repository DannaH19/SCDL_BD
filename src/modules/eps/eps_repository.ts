import { Eps, EpsAttributes } from './eps_model';
import { CreateEpsDto, UpdateEpsDto } from './eps_schema';

export class EpsRepository {
  findAll() {
    return Eps.findAll({ where: { estado_eps: true } });
  }

  findById(id: number) {
    return Eps.findByPk(id);
  }

  findByNit(nit: string) {
    return Eps.findOne({ where: { NIT: nit } });
  }

  create(data: CreateEpsDto) {
    return Eps.create(data as EpsAttributes);
  }

  async update(id: number, data: UpdateEpsDto) {
    const [affected] = await Eps.update(data, { where: { ID_eps: id } });
    return affected;
  }

  async softDelete(id: number) {
    const [affected] = await Eps.update({ estado_eps: false }, { where: { ID_eps: id } });
    return affected;
  }
}