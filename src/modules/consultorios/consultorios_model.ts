import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';

export interface ConsultorioAttributes {
  ID_consultorio: number;
  Num_con?:       string;
  Piso?:          number;
  Bloque?:        string;
  Estado_c?:      boolean;
  ID_sede?:       number;
}

type ConsultorioCreation = Optional<ConsultorioAttributes, 'ID_consultorio'>;

export class Consultorio extends Model<ConsultorioAttributes, ConsultorioCreation> implements ConsultorioAttributes {
  public ID_consultorio!: number;
  public Num_con?:        string;
  public Piso?:           number;
  public Bloque?:         string;
  public Estado_c?:       boolean;
  public ID_sede?:        number;
}

Consultorio.init({
  ID_consultorio: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Num_con:        { type: DataTypes.STRING(10) },
  Piso:           { type: DataTypes.INTEGER },
  Bloque:         { type: DataTypes.STRING(15) },
  Estado_c:       { type: DataTypes.BOOLEAN, defaultValue: true },
  ID_sede:        { type: DataTypes.INTEGER },
}, { sequelize, tableName: 'consultorio', modelName: 'Consultorio', timestamps: false });