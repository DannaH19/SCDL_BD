import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface PacienteAttributes {
  id_paciente:      number;
  id_tipo_doc:      number;
  numero_documento: string;
  primer_nombre:    string;
  segundo_nombre?:  string;
  primer_apellido:  string;
  segundo_apellido?: string;
  fecha_nacimiento: Date;
  genero:           'M' | 'F' | 'O';
  telefono?:        string;
  correo?:          string;
  direccion?:       string;
  id_ciudad?:       number;
  id_eps:           number;
  activo:           boolean;
}

type PacienteCreation = Optional<PacienteAttributes, 'id_paciente' | 'activo'>;

export class Paciente
  extends Model<PacienteAttributes, PacienteCreation>
  implements PacienteAttributes
{
  public id_paciente!:      number;
  public id_tipo_doc!:      number;
  public numero_documento!: string;
  public primer_nombre!:    string;
  public segundo_nombre?:   string;
  public primer_apellido!:  string;
  public segundo_apellido?: string;
  public fecha_nacimiento!: Date;
  public genero!:           'M' | 'F' | 'O';
  public telefono?:         string;
  public correo?:           string;
  public direccion?:        string;
  public id_ciudad?:        number;
  public id_eps!:           number;
  public activo!:           boolean;
}

Paciente.init(
  {
    id_paciente:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_tipo_doc:      { type: DataTypes.INTEGER, allowNull: false },
    numero_documento: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    primer_nombre:    { type: DataTypes.STRING(40), allowNull: false },
    segundo_nombre:   { type: DataTypes.STRING(40) },
    primer_apellido:  { type: DataTypes.STRING(40), allowNull: false },
    segundo_apellido: { type: DataTypes.STRING(40) },
    fecha_nacimiento: { type: DataTypes.DATEONLY, allowNull: false },
    genero:           { type: DataTypes.ENUM('M','F','O'), allowNull: false },
    telefono:         { type: DataTypes.STRING(15) },
    correo:           { type: DataTypes.STRING(80), unique: true },
    direccion:        { type: DataTypes.STRING(120) },
    id_ciudad:        { type: DataTypes.INTEGER },
    id_eps:           { type: DataTypes.INTEGER, allowNull: false },
    activo:           { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: 'pacientes', modelName: 'Paciente' }
);