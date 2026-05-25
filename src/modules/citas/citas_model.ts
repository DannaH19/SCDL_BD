import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface CitaAttributes {
  ID_cita:            number;
  fecha_c:            string;
  hora_c:             string;
  estado_c?:          string;
  Motivo_consulta?:   string;
  fecha_agendamiento?: Date;
  observaciones?:     string;
  ID_medico?:         number;
  ID_paciente?:       number;
  ID_horario?:        number;
  ID_usuario?:        number;
}

type CitaCreation = Optional<CitaAttributes, 'ID_cita'>;

export class Cita extends Model<CitaAttributes, CitaCreation> implements CitaAttributes {
  public ID_cita!:            number;
  public fecha_c!:            string;
  public hora_c!:             string;
  public estado_c?:           string;
  public Motivo_consulta?:    string;
  public fecha_agendamiento?: Date;
  public observaciones?:      string;
  public ID_medico?:          number;
  public ID_paciente?:        number;
  public ID_horario?:         number;
  public ID_usuario?:         number;
}

Cita.init({
  ID_cita:            { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fecha_c:            { type: DataTypes.DATEONLY, allowNull: false },
  hora_c:             { type: DataTypes.TIME, allowNull: false },
  estado_c:           { type: DataTypes.ENUM('Agendada','Confirmada','Cancelada','Atendida','Inasistencia'), defaultValue: 'Agendada' },
  Motivo_consulta:    { type: DataTypes.STRING(150) },
  fecha_agendamiento: { type: DataTypes.DATE },
  observaciones:      { type: DataTypes.TEXT },
  ID_medico:          { type: DataTypes.INTEGER },
  ID_paciente:        { type: DataTypes.INTEGER },
  ID_horario:         { type: DataTypes.INTEGER },
  ID_usuario:         { type: DataTypes.INTEGER },
}, { sequelize, tableName: 'cita_medica', modelName: 'Cita', timestamps: false });