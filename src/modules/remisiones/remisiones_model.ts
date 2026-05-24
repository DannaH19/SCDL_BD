import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface RemisionAttributes {
  id_remision: number;
  id_atencion: number;
  id_especialidad_destino: number;
  motivo_remision: string;
  prioridad: string;
  fecha_remision: string;
  vigencia_dias: number;
  estado: string;
}
type RemisionCreation = Optional<RemisionAttributes, 'id_remision' | 'prioridad' | 'vigencia_dias' | 'estado'>;

export class Remision extends Model<RemisionAttributes, RemisionCreation> implements RemisionAttributes {
  public id_remision!: number;
  public id_atencion!: number;
  public id_especialidad_destino!: number;
  public motivo_remision!: string;
  public prioridad!: string;
  public fecha_remision!: string;
  public vigencia_dias!: number;
  public estado!: string;
}

Remision.init({
  id_remision:             { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_atencion:             { type: DataTypes.INTEGER, allowNull: false },
  id_especialidad_destino: { type: DataTypes.INTEGER, allowNull: false },
  motivo_remision:         { type: DataTypes.TEXT, allowNull: false },
  prioridad:               { type: DataTypes.STRING(15), defaultValue: 'Normal' },
  fecha_remision:          { type: DataTypes.DATEONLY, allowNull: false },
  vigencia_dias:           { type: DataTypes.INTEGER, defaultValue: 30 },
  estado:                  { type: DataTypes.STRING(20), defaultValue: 'Pendiente' },
}, { sequelize, tableName: 'remisiones', modelName: 'Remision' });