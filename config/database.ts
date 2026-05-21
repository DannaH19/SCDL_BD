import { Sequelize } from 'sequelize';
import { ENV } from './env';

export const sequelize = new Sequelize(
  ENV.DB_NAME,
  ENV.DB_USER,
  ENV.DB_PASS,
  {
    host:    ENV.DB_HOST,
    port:    ENV.DB_PORT,
    dialect: 'mysql',
    logging: false,          // cambia a console.log para ver queries en consola
    pool: {
      max:     10,
      min:     0,
      acquire: 30000,
      idle:    10000,
    },
    define: {
      timestamps:  true,     // createdAt / updatedAt automáticos
      underscored: true,     // columnas en snake_case
    },
  }
);

export const connectDB = async (): Promise<void> => {
  await sequelize.authenticate();
  console.log('✅ Conexión a MySQL (XAMPP) establecida correctamente.');
  await sequelize.sync({ alter: true }); // alter:true actualiza tablas sin borrar datos
  console.log('✅ Modelos sincronizados con la base de datos.');
};