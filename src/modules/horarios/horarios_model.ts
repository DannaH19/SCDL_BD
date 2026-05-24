import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface HorarioAttributes {
  ID_horario:    number;
  dia_semana:    string;
  hora_inicio:   string;
  hora_fin:      string;
  fecha_i_vigen?: string;
  fecha_f_vigen?: string;
  estado_h?:     boolean;
  ID_medico?:    number;
  ID_consultorio?: number;
}

type HorarioCreation = Optional<HorarioAttributes, 'ID_horario'>;

export class Horario extends Model<HorarioAttributes, HorarioCreation> implements HorarioAttributes {
  public ID_horario!:     number;
  public dia_semana!:     string;
  public hora_inicio!:    string;
  public hora_fin!:       string;
  public fecha_i_vigen?:  string;
  public fecha_f_vigen?:  string;
  public estado_h?:       boolean;
  public ID_medico?:      number;
  public ID_consultorio?: number;
}

Horario.init({
  ID_horario:    { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  dia_semana:    { type: DataTypes.ENUM('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'), allowNull: false },
  hora_inicio:   { type: DataTypes.TIME, allowNull: false },
  hora_fin:      { type: DataTypes.TIME, allowNull: false },
  fecha_i_vigen: { type: DataTypes.DATEONLY },
  fecha_f_vigen: { type: DataTypes.DATEONLY },
  estado_h:      { type: DataTypes.BOOLEAN, defaultValue: true },
  ID_medico:     { type: DataTypes.INTEGER },
  ID_consultorio:{ type: DataTypes.INTEGER },
}, { sequelize, tableName: 'horario_medico', modelName: 'Horario', timestamps: false });