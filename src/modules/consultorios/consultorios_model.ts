import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface ConsultorioAttributes {
  id_consultorio: number;
  id_sede: number;
  numero_consultorio: string;
  piso?: number;
  descripcion?: string;
  disponible: boolean;
}
type ConsultorioCreation = Optional<ConsultorioAttributes, 'id_consultorio' | 'disponible'>;

export class Consultorio extends Model<ConsultorioAttributes, ConsultorioCreation> implements ConsultorioAttributes {
  public id_consultorio!: number;
  public id_sede!: number;
  public numero_consultorio!: string;
  public piso?: number;
  public descripcion?: string;
  public disponible!: boolean;
}

Consultorio.init({
  id_consultorio:     { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_sede:            { type: DataTypes.INTEGER, allowNull: false },
  numero_consultorio: { type: DataTypes.STRING(10), allowNull: false },
  piso:               { type: DataTypes.INTEGER },
  descripcion:        { type: DataTypes.STRING(100) },
  disponible:         { type: DataTypes.BOOLEAN, defaultValue: true },
}, { sequelize, tableName: 'consultorios', modelName: 'Consultorio' });