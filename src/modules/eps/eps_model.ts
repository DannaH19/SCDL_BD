import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface EpsAttributes {
  ID_eps:       number;
  Nom_eps:      string;
  NIT?:         string;
  tip_regimen:  string;
  telefono_e?:  string;
  correo_e?:    string;
  direccion_e?: string;
  estado_eps?:  boolean;
  ID_ciudad?:   number;
}

type EpsCreation = Optional<EpsAttributes, 'ID_eps'>;

export class Eps extends Model<EpsAttributes, EpsCreation> implements EpsAttributes {
  public ID_eps!:       number;
  public Nom_eps!:      string;
  public NIT?:          string;
  public tip_regimen!:  string;
  public telefono_e?:   string;
  public correo_e?:     string;
  public direccion_e?:  string;
  public estado_eps?:   boolean;
  public ID_ciudad?:    number;
}

Eps.init({
  ID_eps:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Nom_eps:     { type: DataTypes.STRING(50), allowNull: false },
  NIT:         { type: DataTypes.STRING(20) },
  tip_regimen: { type: DataTypes.ENUM('Contributivo','Subsidiado','Especial'), allowNull: false },
  telefono_e:  { type: DataTypes.STRING(10) },
  correo_e:    { type: DataTypes.STRING(50) },
  direccion_e: { type: DataTypes.STRING(100) },
  estado_eps:  { type: DataTypes.BOOLEAN, defaultValue: true },
  ID_ciudad:   { type: DataTypes.INTEGER },
}, { sequelize, tableName: 'eps', modelName: 'Eps', timestamps: false });