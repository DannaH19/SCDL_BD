import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({ selector: 'app-pacientes', templateUrl: './pacientes.component.html', standalone: false })
export class PacientesComponent implements OnInit {
  pacientes: any[] = [];
  loading = true;
  mostrarForm = false;
  editando: any = null;
  form: any = this.formVacio();

  constructor(private api: ApiService, public auth: AuthService) {}
  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading = true;
    this.api.get<any[]>('/pacientes').subscribe({
      next: d => { this.pacientes = d; this.loading = false; },
      error: () => this.loading = false
    });
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
    obs.subscribe({ next: () => { this.cargar(); this.mostrarForm = false; }, error: (e) => alert(e.error?.message || 'Error') });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar este paciente?')) return;
    this.api.delete(`/pacientes/${id}`).subscribe(() => this.cargar());
  }
}