import { Eps, EpsAttributes } from './eps_model';
import { CreateEpsDto, UpdateEpsDto } from './eps_schema';

export class EpsRepository {
  findAll() {
    return Eps.findAll({ where: { activa: true } });
  }

  findById(id: number) {
    return Eps.findByPk(id);
  }

  findByNit(nit: string) {
    return Eps.findOne({ where: { nit } });
  }

  create(data: CreateEpsDto) {
    return Eps.create(data as EpsAttributes);
  }

  async update(id: number, data: UpdateEpsDto) {
    const [affected] = await Eps.update(data, { where: { id_eps: id } });
    return affected;
  }

  async softDelete(id: number) {
    const [affected] = await Eps.update({ activa: false }, { where: { id_eps: id } });
    return affected;
  }
}