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
    logging: false,
    pool: {
      max:     10,
      min:     0,
      acquire: 30000,
      idle:    10000,
    },
  }
);

export const connectDB = async (): Promise<void> => {
  await sequelize.authenticate();
  console.log('✅ Conexión a MySQL (XAMPP) establecida correctamente.');
};