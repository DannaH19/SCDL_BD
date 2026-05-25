import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // 💡 IMPORTAMOS HttpHeaders

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  form: FormGroup;
  error   = '';
  loading = false;

  mostrarRegistro = false;
  errorReg  = '';
  exitoReg  = '';
  regForm = {
    username:   '',
    password:   '',
    Nom_comp:   '',
    correo_u:   '',
    telefono_u: '',
    ID_rol:     3,
    estado_u:   true,
  };

  // 🚀 VARIABLES DE CONTROL PARA LA CREACIÓN DEL PERFIL FÍSICO
  mostrarSeleccionPerfil = false;
  perfilSeleccionado: 'medico' | 'paciente' | null = null;
  usuarioTemporal: any = null;

  // Modelos de datos limpios alineados a tus tablas de phpMyAdmin
  perfilPacienteForm = {
    num_doc_p: '',
    nom_p: '',
    ape_p: '',
    fecha_nac_p: '',
    telefono_p: '',
    correo_p: '',
    direc_p: '',
    ID_tipo_doc: 1,
    ID_genero: 1,
    ID_eps: 1,
    ID_ciudad: 1
  };

  perfilMedicoForm = {
    num_doc_m: '',
    nom_m: '',
    ape_m: '',
    num_lic: '',
    telefono_m: '',
    correo_m: '',
    direc_m: '',
    ID_tipo_doc: 1,
    ID_genero: 1,
    ID_especialidad: 1,
    ID_ciudad: 1
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error   = '';
    const { username, password } = this.form.value;

    this.auth.login(username!, password!).subscribe({
      next: (res: any) => {
        // 💾 Almacenamiento local de la sesión
        if (res?.token) {
          localStorage.setItem('token', res.token);
        }
        if (res?.usuario) {
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
        }
        
        // 🚀 Interceptamos si es su primera vez y no existe físicamente en las tablas
        if (res?.requierePerfil) {
          alert('¡Bienvenido! Detectamos que es tu primer ingreso al sistema. Por favor diligencia tus datos personales obligatorios.');
          
          this.usuarioTemporal = res.usuario;

          // Autoseleccionamos el formulario visual según el rol nativo del usuario
          if (res.usuario?.rol === 3) {
            this.perfilSeleccionado = 'paciente';
          } else if (res.usuario?.rol === 2) {
            this.perfilSeleccionado = 'medico';
          }
          
          // Dividimos el nombre completo para pre-llenar los inputs automáticamente
          if (res.usuario?.nombre) {
            const partesNombre = res.usuario.nombre.split(' ');
            const primerNombre = partesNombre[0] || '';
            const apellidos = partesNombre.slice(1).join(' ') || '';

            this.perfilPacienteForm.nom_p = primerNombre;
            this.perfilPacienteForm.ape_p = apellidos;
            this.perfilMedicoForm.nom_m = primerNombre;
            this.perfilMedicoForm.ape_m = apellidos;
          }
          
          this.mostrarSeleccionPerfil = true;
          this.loading = false;
        } else {
          // Si el perfil ya existía, ingresa directo al dashboard general
          this.router.navigate(['/dashboard']);
        }
      },
      error: (e) => {
        this.error   = e.error?.message || 'Credenciales incorrectas.';
        this.loading = false;
      },
    });
  }

  seleccionarPerfil(tipo: 'medico' | 'paciente') {
    this.perfilSeleccionado = tipo;
  }

  // 🚀 INSERCIÓN FÍSICA A LA TABLA PACIENTE ADJUNTANDO EL TOKEN DE SEGURIDAD
  guardarPerfilPaciente() {
    if (!this.perfilPacienteForm.num_doc_p || !this.perfilPacienteForm.nom_p || !this.perfilPacienteForm.ape_p) {
      alert('Por favor rellena los campos obligatorios (*): Documento, Nombre y Apellido.');
      return;
    }
    this.loading = true;

    // 💡 SOLUCIÓN: Extraemos el token del localStorage y creamos la cabecera de Autorización
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('/api/pacientes', this.perfilPacienteForm, { headers }).subscribe({
      next: () => {
        alert('¡Registro de Paciente creado con éxito en la base de datos!');
        this.finalizarIngreso();
      },
      error: (err) => {
        alert(err.error?.message || 'Error al guardar el perfil del paciente.');
        this.loading = false;
      }
    });
  }

  // 🚀 INSERCIÓN FÍSICA A LA TABLA MEDICO ADJUNTANDO EL TOKEN DE SEGURIDAD
  guardarPerfilMedico() {
    if (!this.perfilMedicoForm.num_doc_m || !this.perfilMedicoForm.nom_m || !this.perfilMedicoForm.ape_m || !this.perfilMedicoForm.num_lic) {
      alert('Por favor rellena los campos obligatorios (*): Documento, Nombre, Apellido y Licencia.');
      return;
    }
    this.loading = true;

    // 💡 SOLUCIÓN: Extraemos el token del localStorage y creamos la cabecera de Autorización
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('/api/medicos', this.perfilMedicoForm, { headers }).subscribe({
      next: () => {
        alert('¡Registro de Médico creado con éxito en la base de datos!');
        this.finalizarIngreso();
      },
      error: (err) => {
        alert(err.error?.message || 'Error al guardar el perfil del médico.');
        this.loading = false;
      }
    });
  }

  finalizarIngreso() {
    this.mostrarSeleccionPerfil = false;
    this.perfilSeleccionado = null;
    this.router.navigate(['/dashboard']);
  }

  registrar() {
    this.errorReg = '';
    this.exitoReg = '';
    if (!this.regForm.username || !this.regForm.password || !this.regForm.Nom_comp) {
      this.errorReg = 'Nombre, usuario y contraseña son obligatorios.';
      return;
    }
    if (this.regForm.password.length < 6) {
      this.errorReg = 'La contraseña debe tener mínimo 6 caracteres.';
      return;
    }
    this.http.post('/api/auth/register', this.regForm).subscribe({
      next: () => {
        this.exitoReg = '¡Cuenta creada! Ya puedes iniciar sesión.';
        this.regForm  = { username:'', password:'', Nom_comp:'', correo_u:'', telefono_u:'', ID_rol:3, estado_u:true };
        setTimeout(() => { this.mostrarRegistro = false; this.exitoReg = ''; }, 2000);
      },
      error: (e) => {
        this.errorReg = e.error?.message || 'Error al crear la cuenta.';
      },
    });
  }
}