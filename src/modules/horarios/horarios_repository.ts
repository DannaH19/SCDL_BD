import { Horario, HorarioAttributes } from './horarios_model';
import { CreateHorarioDto, UpdateHorarioDto } from './horarios_schema';

export class HorarioRepository {
  findAll()            { return Horario.findAll({ where: { estado_h: true } }); }
  findById(id: number) { return Horario.findByPk(id); }
  findByMedico(id: number) { return Horario.findAll({ where: { ID_medico: id, estado_h: true } }); }
  create(data: CreateHorarioDto) { return Horario.create(data as HorarioAttributes); }
  async update(id: number, data: UpdateHorarioDto) {
    const [a] = await Horario.update(data, { where: { ID_horario: id } }); return a;
  }
  async softDelete(id: number) {
    const [a] = await Horario.update({ estado_h: false }, { where: { ID_horario: id } }); return a;
  }
}