import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface MedicoAttributes {
  ID_medico:      number;
  num_doc_m:      string;
  nom_m:          string;
  ape_m:          string;
  num_lic?:       string;
  telefono_m?:    string;
  correo_m?:      string;
  direc_m?:       string;
  estado_m?:      boolean;
  fecha_registro?: Date;
  ID_tipo_doc?:   number;
  ID_genero?:     number;
  ID_especialidad?: number;
  ID_ciudad?:     number;
}

type MedicoCreation = Optional<MedicoAttributes, 'ID_medico'>;

export class Medico extends Model<MedicoAttributes, MedicoCreation> implements MedicoAttributes {
  public ID_medico!:      number;
  public num_doc_m!:      string;
  public nom_m!:          string;
  public ape_m!:          string;
  public num_lic?:        string;
  public telefono_m?:     string;
  public correo_m?:       string;
  public direc_m?:        string;
  public estado_m?:       boolean;
  public fecha_registro?: Date;
  public ID_tipo_doc?:    number;
  public ID_genero?:      number;
  public ID_especialidad?: number;
  public ID_ciudad?:      number;
}

Medico.init({
  ID_medico:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  num_doc_m:      { type: DataTypes.STRING(20), allowNull: false },
  nom_m:          { type: DataTypes.STRING(20), allowNull: false },
  ape_m:          { type: DataTypes.STRING(35), allowNull: false },
  num_lic:        { type: DataTypes.STRING(20) },
  telefono_m:     { type: DataTypes.STRING(10) },
  correo_m:       { type: DataTypes.STRING(50) },
  direc_m:        { type: DataTypes.STRING(100) },
  estado_m:       { type: DataTypes.BOOLEAN, defaultValue: true },
  fecha_registro: { type: DataTypes.DATE },
  ID_tipo_doc:    { type: DataTypes.INTEGER },
  ID_genero:      { type: DataTypes.INTEGER },
  ID_especialidad:{ type: DataTypes.INTEGER },
  ID_ciudad:      { type: DataTypes.INTEGER },
}, { sequelize, tableName: 'medico', modelName: 'Medico', timestamps: false });