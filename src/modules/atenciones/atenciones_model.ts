import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface AtencionAttributes {
  ID_atencion: number;
  fecha_aten?: Date;
  diagnostico?: string;
  tratamiento?: string;
  formula_direc?: string;
  observaciones?: string;
  incapacidad?: boolean;
  estado_a?: boolean;
  ID_cita: number;
}

type AtencionCreation = Optional<AtencionAttributes, 'ID_atencion'>;

export class Atencion extends Model<AtencionAttributes, AtencionCreation> implements AtencionAttributes {
  public ID_atencion!: number;
  public fecha_aten?: Date;
  public diagnostico?: string;
  public tratamiento?: string;
  public formula_direc?: string;
  public observaciones?: string;
  public incapacidad?: boolean;
  public estado_a?: boolean;
  public ID_cita!: number;
}

Atencion.init(
  {
    ID_atencion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha_aten: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    diagnostico: {
      type: DataTypes.TEXT,
    },
    tratamiento: {
      type: DataTypes.TEXT,
    },
    formula_direc: {
      type: DataTypes.TEXT,
    },
    observaciones: {
      type: DataTypes.TEXT,
    },
    incapacidad: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    estado_a: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    ID_cita: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Atencion',
    modelName: 'Atencion',
    timestamps: false,
  }
);