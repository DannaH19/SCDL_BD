import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({ selector: 'app-medicos', templateUrl: './medicos.component.html', standalone: false })
export class MedicosComponent implements OnInit {
  medicos: any[] = [];
  loading = true;
  mostrarForm = false;
  editando: any = null;
  form: any = this.formVacio();

  constructor(private api: ApiService, public auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading = true;
    this.api.get<any[]>('/medicos').subscribe({
      next: d => { this.medicos = d; this.loading = false; this.cdr.detectChanges(); },
      error: (e) => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  formVacio() {
    return { num_doc_m:'', nom_m:'', ape_m:'', num_lic:'', telefono_m:'', correo_m:'', direc_m:'', ID_tipo_doc:1, ID_genero:1, ID_especialidad:null, ID_ciudad:null };
  }

  nuevo() { this.form = this.formVacio(); this.editando = null; this.mostrarForm = true; }
  editar(m: any) { this.form = { ...m }; this.editando = m.ID_medico; this.mostrarForm = true; }

  guardar() {
    const payload = {
      ...this.form,
      ID_tipo_doc:     this.form.ID_tipo_doc     ? Number(this.form.ID_tipo_doc)     : undefined,
      ID_genero:       this.form.ID_genero       ? Number(this.form.ID_genero)       : undefined,
      ID_especialidad: this.form.ID_especialidad ? Number(this.form.ID_especialidad) : undefined,
      ID_ciudad:       this.form.ID_ciudad       ? Number(this.form.ID_ciudad)       : undefined,
    };
    const obs = this.editando
      ? this.api.put(`/medicos/${this.editando}`, payload)
      : this.api.post('/medicos', payload);
    obs.subscribe({ 
      next: () => { this.cargar(); this.mostrarForm = false; }, 
      error: (e) => alert(e.error?.message || 'Error') 
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar este médico?')) return;
    this.api.delete(`/medicos/${id}`).subscribe(() => this.cargar());
  }
}