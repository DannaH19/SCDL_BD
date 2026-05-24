import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({ selector: 'app-eps', templateUrl: './eps.component.html', standalone: false })
export class EpsComponent implements OnInit {
  epsList: any[] = [];
  loading = true;
  mostrarForm = false;
  editando: any = null;
  form: any = this.formVacio();

  constructor(private api: ApiService) {}
  ngOnInit() { this.cargar(); }

  cargar() {
    this.api.get<any[]>('/eps').subscribe({
      next: d => { this.epsList = d; this.loading = false; },
      error: () => this.loading = false
    });
  }

  formVacio() {
    return { Nom_eps:'', NIT:'', tip_regimen:'Contributivo', telefono_e:'', correo_e:'', direccion_e:'', ID_ciudad:'' };
  }

  nuevo() { this.form = this.formVacio(); this.editando = null; this.mostrarForm = true; }
  editar(e: any) { this.form = { ...e }; this.editando = e.ID_eps; this.mostrarForm = true; }

  guardar() {
    const obs = this.editando
      ? this.api.put(`/eps/${this.editando}`, this.form)
      : this.api.post('/eps', this.form);
    obs.subscribe({ next: () => { this.cargar(); this.mostrarForm = false; }, error: (e) => alert(e.error?.message || 'Error') });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar esta EPS?')) return;
    this.api.delete(`/eps/${id}`).subscribe(() => this.cargar());
  }
}