import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface MedicoAttributes {
  id_medico: number;
  id_tipo_doc: number;
  numero_documento: string;
  registro_medico: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  id_especialidad: number;
  id_sede_principal: number;
  telefono?: string;
  correo?: string;
  activo: boolean;
}
type MedicoCreation = Optional<MedicoAttributes, 'id_medico' | 'activo'>;

export class Medico extends Model<MedicoAttributes, MedicoCreation> implements MedicoAttributes {
  public id_medico!: number;
  public id_tipo_doc!: number;
  public numero_documento!: string;
  public registro_medico!: string;
  public primer_nombre!: string;
  public segundo_nombre?: string;
  public primer_apellido!: string;
  public segundo_apellido?: string;
  public id_especialidad!: number;
  public id_sede_principal!: number;
  public telefono?: string;
  public correo?: string;
  public activo!: boolean;
}

Medico.init({
  id_medico:         { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_tipo_doc:       { type: DataTypes.INTEGER, allowNull: false },
  numero_documento:  { type: DataTypes.STRING(20), allowNull: false, unique: true },
  registro_medico:   { type: DataTypes.STRING(20), allowNull: false, unique: true },
  primer_nombre:     { type: DataTypes.STRING(40), allowNull: false },
  segundo_nombre:    { type: DataTypes.STRING(40) },
  primer_apellido:   { type: DataTypes.STRING(40), allowNull: false },
  segundo_apellido:  { type: DataTypes.STRING(40) },
  id_especialidad:   { type: DataTypes.INTEGER, allowNull: false },
  id_sede_principal: { type: DataTypes.INTEGER, allowNull: false },
  telefono:          { type: DataTypes.STRING(15) },
  correo:            { type: DataTypes.STRING(80), unique: true },
  activo:            { type: DataTypes.BOOLEAN, defaultValue: true },
}, { sequelize, tableName: 'medicos', modelName: 'Medico' });