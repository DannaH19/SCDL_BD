import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import authRoutes from './modules/auth/auth.routes';
import usuarioRoutes from './modules/usuarios/usuario.routes';
import atencionRoutes from './modules/atenciones/atenciones_routes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/atenciones', atencionRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '✅ API SCDL funcionando correctamente' });
});

export default app;