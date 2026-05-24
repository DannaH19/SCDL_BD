import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';

// Rutas
import authRoutes        from './modules/auth/auth.routes';
import usuarioRoutes     from './modules/usuarios/usuario.routes';
import atencionRoutes    from './modules/atenciones/atenciones_routes';
import pacienteRoutes    from './modules/pacientes/pacientes_routes';
import medicoRoutes      from './modules/medicos/medicos_routes';
import citaRoutes        from './modules/citas/citas_routes';
import sedeRoutes        from './modules/sedes/sedes_routes';
import consultorioRoutes from './modules/consultorios/consultorios_routes';
import horarioRoutes     from './modules/horarios/horarios_routes';
import remisionRoutes    from './modules/remisiones/remisiones_routes';
import epsRoutes from './modules/eps/eps_routes';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Rutas
app.use('/api/auth',         authRoutes);
app.use('/api/usuarios',     usuarioRoutes);
app.use('/api/atenciones',   atencionRoutes);
app.use('/api/pacientes',    pacienteRoutes);
app.use('/api/medicos',      medicoRoutes);
app.use('/api/citas',        citaRoutes);
app.use('/api/sedes',        sedeRoutes);
app.use('/api/consultorios', consultorioRoutes);
app.use('/api/eps',          epsRoutes);
app.use('/api/horarios',     horarioRoutes);
app.use('/api/remisiones',   remisionRoutes);


export default app;