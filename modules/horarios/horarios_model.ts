import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface HorarioAttributes {
  id_horario: number;
  id_medico: number;
  id_sede: number;
  id_consultorio?: number;
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
  duracion_cita_min: number;
  cupo_maximo: number;
  vigente: boolean;
}
type HorarioCreation = Optional<HorarioAttributes, 'id_horario' | 'vigente'>;

export class Horario extends Model<HorarioAttributes, HorarioCreation> implements HorarioAttributes {
  public id_horario!: number;
  public id_medico!: number;
  public id_sede!: number;
  public id_consultorio?: number;
  public dia_semana!: number;
  public hora_inicio!: string;
  public hora_fin!: string;
  public duracion_cita_min!: number;
  public cupo_maximo!: number;
  public vigente!: boolean;
}

Horario.init({
  id_horario:        { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_medico:         { type: DataTypes.INTEGER, allowNull: false },
  id_sede:           { type: DataTypes.INTEGER, allowNull: false },
  id_consultorio:    { type: DataTypes.INTEGER },
  dia_semana:        { type: DataTypes.TINYINT, allowNull: false },
  hora_inicio:       { type: DataTypes.TIME, allowNull: false },
  hora_fin:          { type: DataTypes.TIME, allowNull: false },
  duracion_cita_min: { type: DataTypes.INTEGER, defaultValue: 20 },
  cupo_maximo:       { type: DataTypes.INTEGER, allowNull: false },
  vigente:           { type: DataTypes.BOOLEAN, defaultValue: true },
}, { sequelize, tableName: 'horarios', modelName: 'Horario' });