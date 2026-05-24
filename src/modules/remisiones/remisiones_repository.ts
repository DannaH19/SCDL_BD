import { Remision, RemisionAttributes } from './remisiones_model';
import { CreateRemisionDto, UpdateRemisionDto } from './remisiones_schema';

export class RemisionRepository {
  findAll()              { return Remision.findAll(); }
  findById(id: number)   { return Remision.findByPk(id); }
  findByAtencion(id: number) { return Remision.findAll({ where: { id_atencion: id } }); }
  create(data: CreateRemisionDto) { return Remision.create(data as RemisionAttributes); }
  async update(id: number, data: UpdateRemisionDto) {
    const [a] = await Remision.update(data, { where: { id_remision: id } }); return a;
  }
}