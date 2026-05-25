import { Atencion } from './atenciones_model';
import { CreateAtencionDto, UpdateAtencionDto } from './atenciones_schema';

export class AtencionRepository {
  findAll()            { return Atencion.findAll(); }
  findById(id: number) { return Atencion.findByPk(id); }
  findByCita(id: number){ return Atencion.findOne({ where: { ID_cita: id } }); }
  create(data: CreateAtencionDto) { return Atencion.create(data as any); }
  async update(id: number, data: UpdateAtencionDto) {
    const [a] = await Atencion.update(data as any, { where: { ID_atencion: id } });
    return a;
  }
}