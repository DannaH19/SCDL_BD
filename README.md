🏥 SCDL — Sistema de Gestión de Turnos Médicos

Materia: Bases de Datos II
Institución: Escuela Tecnológica Instituto Técnico Central
Estudiantes: Danna Herrera · Sara Guarín


📋 Descripción
SCDL es un sistema web para la gestión de turnos y atenciones médicas. Permite administrar pacientes, médicos, citas, sedes, EPS y usuarios, con control de acceso por roles y conexión a base de datos MySQL.

🛠️ Tecnologías utilizadas
Backend

Node.js con TypeScript
Express.js — framework web
Sequelize — ORM para MySQL
JWT — autenticación por tokens
Zod — validación de datos
bcrypt — encriptación de contraseñas

Frontend

Angular — framework de interfaz gráfica
TypeScript

Base de datos

MySQL (XAMPP)
Procedimientos almacenados, triggers, vistas y transacciones


🗄️ Base de datos
El sistema cuenta con las siguientes tablas:
TablaDescripciónUsuarioUsuarios del sistema con rolesRolRoles: Superadmin, Administrador, Usuario, ConsultorPacienteRegistro de pacientesMedicoRegistro de médicosEspecialidadEspecialidades médicasCita_MedicaAgendamiento de citasAtencionRegistro de atenciones médicasHorario_MedicoHorarios de disponibilidadSedeSedes médicasConsultorioConsultorios por sedeEPSEntidades promotoras de saludCiudadCiudades de ColombiaTipo_documentoCC, TI, CE, NIT, PEPGeneroGéneros
Elementos SQL implementados

✅ DDL y DML completo
✅ 20 consultas SQL con JOINs, subconsultas y funciones de agregación
✅ 3 Triggers
✅ 3 Procedimientos almacenados con COMMIT y ROLLBACK
✅ Vistas
✅ Transacciones


🚀 Instalación y uso
Requisitos previos

Node.js v18 o superior
XAMPP con MySQL activo
Angular CLI

1. Clonar el repositorio
bashgit clone https://github.com/DannaH19/SCDL_BD.git
cd SCDL_BD
2. Configurar la base de datos

Abre XAMPP y activa Apache y MySQL
Abre phpMyAdmin en http://localhost/phpmyadmin
Importa el archivo SCDL_DB.sql

3. Configurar el backend
bashcd src
npm install
Crea el archivo .env en la carpeta src:
envPORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=SCDL_DB
DB_USER=root
DB_PASS=
JWT_SECRET=secret_scdl_2024
JWT_EXPIRES_IN=24h
Inicia el backend:
bashnpx ts-node-dev server.ts
4. Configurar el frontend
bashcd scdl-frontend
npm install
ng serve
5. Acceder al sistema
Abre el navegador en: http://localhost:4200
Usuarios de prueba:
UsernameContraseñaRolsuperadminAdmin2024*SuperadminlmartinezUser2024*AdministradorjrodriguezUser2024*UsuarioclopezUser2024*Consultor

👥 Roles del sistema
RolPermisosSuperadminAcceso total al sistemaAdministradorGestión de usuarios y configuraciónUsuarioAgendamiento de citasConsultorSolo lectura de reportes

📁 Estructura del proyecto
SCDL_BD/
├── src/                        # Backend (TypeScript)
│   ├── config/                 # Configuración BD y variables de entorno
│   ├── middlewares/            # Autenticación y validación
│   ├── modules/                # Módulos del sistema
│   │   ├── auth/               # Login y autenticación
│   │   ├── usuarios/           # CRUD usuarios
│   │   ├── pacientes/          # CRUD pacientes
│   │   ├── medicos/            # CRUD médicos
│   │   ├── citas/              # CRUD citas
│   │   ├── atenciones/         # CRUD atenciones
│   │   ├── sedes/              # CRUD sedes
│   │   ├── eps/                # CRUD EPS
│   │   └── horarios/           # CRUD horarios
│   ├── app.ts                  # Configuración Express
│   └── server.ts               # Punto de entrada
├── scdl-frontend/              # Frontend (Angular)
│   └── src/
│       └── app/
│           ├── core/           # Guards y servicios
│           └── modules/        # Componentes
└── SCDL_DB.sql  
📄 Licencia
Proyecto académico — Escuela Tecnológica Instituto Técnico Central · 2026