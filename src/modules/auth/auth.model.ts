import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/database';

class Usuario extends Model {
  declare Id_Usuario: number;
  declare username: string;
  declare contraseña: string;
  declare Nom_comp: string;
  declare correo_u: string;     
  declare telefono_u: string;   
  declare ulti_acceso: Date;    
  declare estado_u: boolean;
  declare ID_rol: number;
}

Usuario.init(
  {
    Id_Usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    contraseña: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Nom_comp: {
      type: DataTypes.STRING(80),
    },
    correo_u: {
      type: DataTypes.STRING(50),
    },
    telefono_u: {
      type: DataTypes.STRING(10),
    },
    ulti_acceso: {
      type: DataTypes.DATE, 
      allowNull: true,
    },
    estado_u: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    ID_rol: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'Usuario', 
    timestamps: false,
  }
);

export default Usuario;