import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface PacienteAttributes {
  ID_Paciente:    number;
  num_doc_p:      string;
  nom_p:          string;
  ape_p:          string;
  fecha_nac_p?:   string;
  telefono_p?:    string;
  correo_p?:      string;
  direc_p?:       string;
  estado_p?:      boolean;
  fecha_registro?: Date;
  ID_tipo_doc?:   number;
  ID_genero?:     number;
  ID_eps?:        number;
  ID_ciudad?:     number;
}

type PacienteCreation = Optional<PacienteAttributes, 'ID_Paciente'>;

export class Paciente extends Model<PacienteAttributes, PacienteCreation> implements PacienteAttributes {
  public ID_Paciente!:   number;
  public num_doc_p!:     string;
  public nom_p!:         string;
  public ape_p!:         string;
  public fecha_nac_p?:   string;
  public telefono_p?:    string;
  public correo_p?:      string;
  public direc_p?:       string;
  public estado_p?:      boolean;
  public fecha_registro?: Date;
  public ID_tipo_doc?:   number;
  public ID_genero?:     number;
  public ID_eps?:        number;
  public ID_ciudad?:     number;
}

Paciente.init({
  ID_Paciente:    { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  num_doc_p:      { type: DataTypes.STRING(20), allowNull: false },
  nom_p:          { type: DataTypes.STRING(20), allowNull: false },
  ape_p:          { type: DataTypes.STRING(35), allowNull: false },
  fecha_nac_p:    { type: DataTypes.DATEONLY },
  telefono_p:     { type: DataTypes.STRING(10) },
  correo_p:       { type: DataTypes.STRING(50) },
  direc_p:        { type: DataTypes.STRING(100) },
  estado_p:       { type: DataTypes.BOOLEAN, defaultValue: true },
  fecha_registro: { type: DataTypes.DATE },
  ID_tipo_doc:    { type: DataTypes.INTEGER },
  ID_genero:      { type: DataTypes.INTEGER },
  ID_eps:         { type: DataTypes.INTEGER },
  ID_ciudad:      { type: DataTypes.INTEGER },
}, { sequelize, tableName: 'paciente', modelName: 'Paciente', timestamps: false });