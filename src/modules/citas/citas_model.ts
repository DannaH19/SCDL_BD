import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface CitaAttributes {
  id_cita: number;
  id_paciente: number;
  id_medico: number;
  id_sede: number;
  id_consultorio?: number;
  id_tipo_consulta: number;
  id_horario: number;
  fecha_cita: string;
  hora_cita: string;
  estado: string;
  motivo_consulta?: string;
  numero_autorizacion?: string;
  canal_agendamiento: string;
  creado_por: number;
}
type CitaCreation = Optional<CitaAttributes, 'id_cita' | 'estado' | 'canal_agendamiento'>;

export class Cita extends Model<CitaAttributes, CitaCreation> implements CitaAttributes {
  public id_cita!: number;
  public id_paciente!: number;
  public id_medico!: number;
  public id_sede!: number;
  public id_consultorio?: number;
  public id_tipo_consulta!: number;
  public id_horario!: number;
  public fecha_cita!: string;
  public hora_cita!: string;
  public estado!: string;
  public motivo_consulta?: string;
  public numero_autorizacion?: string;
  public canal_agendamiento!: string;
  public creado_por!: number;
}

Cita.init({
  id_cita:              { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_paciente:          { type: DataTypes.INTEGER, allowNull: false },
  id_medico:            { type: DataTypes.INTEGER, allowNull: false },
  id_sede:              { type: DataTypes.INTEGER, allowNull: false },
  id_consultorio:       { type: DataTypes.INTEGER },
  id_tipo_consulta:     { type: DataTypes.INTEGER, allowNull: false },
  id_horario:           { type: DataTypes.INTEGER, allowNull: false },
  fecha_cita:           { type: DataTypes.DATEONLY, allowNull: false },
  hora_cita:            { type: DataTypes.TIME, allowNull: false },
  estado:               { type: DataTypes.STRING(20), defaultValue: 'Pendiente' },
  motivo_consulta:      { type: DataTypes.TEXT },
  numero_autorizacion:  { type: DataTypes.STRING(30) },
  canal_agendamiento:   { type: DataTypes.STRING(20), defaultValue: 'Presencial' },
  creado_por:           { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize, tableName: 'citas', modelName: 'Cita' });