import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({ selector: 'app-eps', templateUrl: './eps.component.html', standalone: false })
export class EpsComponent implements OnInit {
  epsList: any[] = [];
  loading = true;
  mostrarForm = false;
  editando: any = null;
  form: any = this.formVacio();

  constructor(private api: ApiService, public auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading = true;
    this.api.get<any[]>('/eps').subscribe({
      next: d => { this.epsList = d; this.loading = false; this.cdr.detectChanges(); },
      error: (e) => { console.log('Error:', e); this.loading = false; this.cdr.detectChanges(); }
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
    obs.subscribe({ 
      next: () => { this.cargar(); this.mostrarForm = false; }, 
      error: (e) => alert(e.error?.message || 'Error') 
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar esta EPS?')) return;
    this.api.delete(`/eps/${id}`).subscribe(() => this.cargar());
  }
}