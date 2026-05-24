import { Sede, SedeAttributes } from './sedes_model';
import { CreateSedeDto, UpdateSedeDto } from './sedes_schema';

export class SedeRepository {
  findAll()            { return Sede.findAll({ where: { activa: true } }); }
  findById(id: number) { return Sede.findByPk(id); }
  create(data: CreateSedeDto) { return Sede.create(data as SedeAttributes); }
  async update(id: number, data: UpdateSedeDto) {
    const [a] = await Sede.update(data, { where: { id_sede: id } }); return a;
  }
  async softDelete(id: number) {
    const [a] = await Sede.update({ activa: false }, { where: { id_sede: id } }); return a;
  }
}