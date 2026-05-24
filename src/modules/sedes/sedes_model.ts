import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface SedeAttributes {
  id_sede: number;
  nombre_sede: string;
  direccion: string;
  id_ciudad: number;
  telefono_sede?: string;
  correo_sede?: string;
  nivel_atencion: number;
  activa: boolean;
}

type SedeCreation = Optional<SedeAttributes, 'id_sede' | 'activa'>;

export class Sede extends Model<SedeAttributes, SedeCreation> implements SedeAttributes {
  public id_sede!: number;
  public nombre_sede!: string;
  public direccion!: string;
  public id_ciudad!: number;
  public telefono_sede?: string;
  public correo_sede?: string;
  public nivel_atencion!: number;
  public activa!: boolean;
}

Sede.init({
  id_sede:        { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre_sede:    { type: DataTypes.STRING(80), allowNull: false },
  direccion:      { type: DataTypes.STRING(120), allowNull: false },
  id_ciudad:      { type: DataTypes.INTEGER, allowNull: false },
  telefono_sede:  { type: DataTypes.STRING(15) },
  correo_sede:    { type: DataTypes.STRING(80) },
  nivel_atencion: { type: DataTypes.INTEGER, defaultValue: 1 },
  activa:         { type: DataTypes.BOOLEAN, defaultValue: true },
}, { sequelize, tableName: 'sedes', modelName: 'Sede' });
