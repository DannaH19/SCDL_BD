import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({ 
  selector: 'app-pacientes', 
  templateUrl: './pacientes.component.html', 
  standalone: false 
})
export class PacientesComponent implements OnInit {
  pacientes: any[] = [];
  loading = true;
  mostrarForm = false;
  editando: any = null;
  form: any = this.formVacio();

  // Variable exclusiva para manejar el perfil del usuario activo en "Mi Cuenta"
  perfilUsuarioActual: any = null;

  constructor(private api: ApiService, public auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading = true;
    const usuarioLogueado = this.auth.getUser();

    // 🚀 CASO 1: Si es un Paciente (Rol Usuario = 3), buscamos estrictamente su perfil por Correo
    if (this.auth.isUsuario() && usuarioLogueado) {
      const correoUsuario = usuarioLogueado.correo_u; // Tomamos 'sara@test.com' directamente

      this.api.get<any[]>(`/pacientes?correo=${correoUsuario}`).subscribe({
        next: d => {
          this.pacientes = d;
          
          // 💡 Corrección del Error TS2698: Casteamos el elemento a (any) antes del spread
          if (Array.isArray(d) && d.length > 0) {
            this.perfilUsuarioActual = d[0];
            this.form = { ...(d[0] as any) }; 
          } else if (d && !Array.isArray(d)) {
            this.perfilUsuarioActual = d;
            this.form = { ...(d as any) };
          }
          
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (e) => {
          console.error('Error cargando perfil del paciente:', e);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });

    } else {
      // 🚀 CASO 2: Si es Administrador / Superadmin, cargamos todos los pacientes normalmente
      this.api.get<any[]>('/pacientes').subscribe({
        next: d => {
          this.pacientes = d;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (e) => {
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  formVacio() {
    return { num_doc_p:'', nom_p:'', ape_p:'', fecha_nac_p:'', telefono_p:'', correo_p:'', direc_p:'', ID_tipo_doc:1, ID_genero:1, ID_eps:'', ID_ciudad:'' };
  }

  nuevo() { this.form = this.formVacio(); this.editando = null; this.mostrarForm = true; }

  editar(p: any) { this.form = { ...p }; this.editando = p.ID_Paciente; this.mostrarForm = true; }

  guardar() {
    const obs = this.editando
      ? this.api.put(`/pacientes/${this.editando}`, this.form)
      : this.api.post('/pacientes', this.form);
    obs.subscribe({ 
      next: () => { this.cargar(); this.mostrarForm = false; }, 
      error: (e) => alert(e.error?.message || 'Error') 
    });
  }

  // 👇 ACTUALIZACIÓN TOTALMENTE DINÁMICA DE MI CUENTA
  guardarPerfil(pacienteModificado: any) {
    const target = pacienteModificado || this.perfilUsuarioActual;
    if (!target || !target.ID_Paciente) {
      alert('No se pudo identificar el código del paciente a actualizar.');
      return;
    }

    const datosActualizados = {
      ...target,
      telefono_p: target.telefono_p,
      correo_p: target.correo_p,
      direc_p: target.direc_p
    };

    this.api.put(`/pacientes/${target.ID_Paciente}`, datosActualizados).subscribe({
      next: () => {
        alert('¡Tus datos de cuenta se han actualizado correctamente!');
        this.cargar(); // Recarga los datos limpios de la base de datos
      },
      error: (e) => alert(e.error?.message || 'Error al intentar actualizar el perfil')
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar este paciente?')) return;
    this.api.delete(`/pacientes/${id}`).subscribe(() => this.cargar());
  }
}