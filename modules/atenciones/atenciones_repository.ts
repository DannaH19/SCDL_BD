import { Atencion, AtencionAttributes } from './atenciones_model';
import { CreateAtencionDto, UpdateAtencionDto } from './atenciones_schema';

export class AtencionRepository {
  findAll()              { return Atencion.findAll(); }
  findById(id: number)   { return Atencion.findByPk(id); }
  findByTurno(id: number){ return Atencion.findOne({ where: { id_turno: id } }); }
  create(data: CreateAtencionDto) { return Atencion.create(data as any); }
  async update(id: number, data: UpdateAtencionDto) {
    const [a] = await Atencion.update(data as any, { where: { id_atencion: id } }); return a;
  }
}