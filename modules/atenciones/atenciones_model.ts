import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface AtencionAttributes {
  id_atencion: number;
  id_turno: number;
  peso_kg?: number;
  talla_cm?: number;
  presion_arterial?: string;
  temperatura_c?: number;
  frecuencia_cardiaca?: number;
  saturacion_oxigeno?: number;
  observaciones?: string;
  fecha_atencion: Date;
}
type AtencionCreation = Optional<AtencionAttributes, 'id_atencion'>;

export class Atencion extends Model<AtencionAttributes, AtencionCreation> implements AtencionAttributes {
  public id_atencion!: number;
  public id_turno!: number;
  public peso_kg?: number;
  public talla_cm?: number;
  public presion_arterial?: string;
  public temperatura_c?: number;
  public frecuencia_cardiaca?: number;
  public saturacion_oxigeno?: number;
  public observaciones?: string;
  public fecha_atencion!: Date;
}

Atencion.init({
  id_atencion:          { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_turno:             { type: DataTypes.INTEGER, allowNull: false, unique: true },
  peso_kg:              { type: DataTypes.DECIMAL(5,2) },
  talla_cm:             { type: DataTypes.DECIMAL(5,1) },
  presion_arterial:     { type: DataTypes.STRING(10) },
  temperatura_c:        { type: DataTypes.DECIMAL(4,1) },
  frecuencia_cardiaca:  { type: DataTypes.INTEGER },
  saturacion_oxigeno:   { type: DataTypes.DECIMAL(4,1) },
  observaciones:        { type: DataTypes.TEXT },
  fecha_atencion:       { type: DataTypes.DATE, allowNull: false },
}, { sequelize, tableName: 'atenciones', modelName: 'Atencion' });