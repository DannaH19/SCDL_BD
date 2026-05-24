import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({ selector: 'app-medicos', templateUrl: './medicos.component.html', standalone: false })
export class MedicosComponent implements OnInit {
  medicos: any[] = [];
  loading = true;
  mostrarForm = false;
  editando: any = null;
  form: any = this.formVacio();

  constructor(private api: ApiService) {}
  ngOnInit() { this.cargar(); }

  cargar() {
    this.api.get<any[]>('/medicos').subscribe({
      next: d => { this.medicos = d; this.loading = false; },
      error: () => this.loading = false
    });
  }

  formVacio() {
    return { num_doc_m:'', nom_m:'', ape_m:'', num_lic:'', telefono_m:'', correo_m:'', direc_m:'', ID_tipo_doc:1, ID_genero:1, ID_especialidad:'', ID_ciudad:'' };
  }

  nuevo() { this.form = this.formVacio(); this.editando = null; this.mostrarForm = true; }
  editar(m: any) { this.form = { ...m }; this.editando = m.ID_medico; this.mostrarForm = true; }

  guardar() {
    const obs = this.editando
      ? this.api.put(`/medicos/${this.editando}`, this.form)
      : this.api.post('/medicos', this.form);
    obs.subscribe({ next: () => { this.cargar(); this.mostrarForm = false; }, error: (e) => alert(e.error?.message || 'Error') });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar este medico?')) return;
    this.api.delete(`/medicos/${id}`).subscribe(() => this.cargar());
  }
}