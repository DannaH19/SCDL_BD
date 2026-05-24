import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface SedeAttributes {
  ID_sede:     number;
  Nom_sede:    string;
  Direc_s?:    string;
  Telefono_s?: string;
  Correo_s?:   string;
  Estado_s?:   boolean;
  ID_ciudad?:  number;
}

type SedeCreation = Optional<SedeAttributes, 'ID_sede'>;

export class Sede extends Model<SedeAttributes, SedeCreation> implements SedeAttributes {
  public ID_sede!:     number;
  public Nom_sede!:    string;
  public Direc_s?:     string;
  public Telefono_s?:  string;
  public Correo_s?:    string;
  public Estado_s?:    boolean;
  public ID_ciudad?:   number;
}

Sede.init({
  ID_sede:    { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Nom_sede:   { type: DataTypes.STRING(60), allowNull: false },
  Direc_s:    { type: DataTypes.STRING(100) },
  Telefono_s: { type: DataTypes.STRING(10) },
  Correo_s:   { type: DataTypes.STRING(50) },
  Estado_s:   { type: DataTypes.BOOLEAN, defaultValue: true },
  ID_ciudad:  { type: DataTypes.INTEGER },
}, { sequelize, tableName: 'sede', modelName: 'Sede', timestamps: false });
