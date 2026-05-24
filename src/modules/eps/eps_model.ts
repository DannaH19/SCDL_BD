import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface EpsAttributes {
  id_eps: number;
  nombre_eps: string;
  nit: string;
  tipo_regimen: string;
  telefono_eps?: string;
  correo_eps?: string;
  activa: boolean;
}

type EpsCreation = Optional<EpsAttributes, 'id_eps' | 'activa'>;

export class Eps extends Model<EpsAttributes, EpsCreation> implements EpsAttributes {
  public id_eps!: number;
  public nombre_eps!: string;
  public nit!: string;
  public tipo_regimen!: string;
  public telefono_eps?: string;
  public correo_eps?: string;
  public activa!: boolean;
}

Eps.init({
  id_eps:       { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre_eps:   { type: DataTypes.STRING(80), allowNull: false, unique: true },
  nit:          { type: DataTypes.STRING(20), allowNull: false, unique: true },
  tipo_regimen: { type: DataTypes.ENUM('Contributivo', 'Subsidiado', 'Especial'), allowNull: false },
  telefono_eps: { type: DataTypes.STRING(15) },
  correo_eps:   { type: DataTypes.STRING(80) },
  activa:       { type: DataTypes.BOOLEAN, defaultValue: true },
}, { sequelize, tableName: 'eps', modelName: 'Eps' });