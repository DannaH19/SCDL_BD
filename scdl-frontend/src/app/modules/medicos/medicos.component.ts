<<<<<<< HEAD
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({ selector: 'app-medicos', templateUrl: './medicos.component.html', standalone: false })
export class MedicosComponent implements OnInit {
  medicos: any[] = [];
  loading = true;
  mostrarForm = false;
  editando: any = null;
  form: any = this.formVacio();

<<<<<<< HEAD
  constructor(private api: ApiService, public auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading = true;
    this.api.get<any[]>('/medicos').subscribe({
      next: d => { this.medicos = d; this.loading = false; this.cdr.detectChanges(); },
      error: (e) => { console.log('Error:', e); this.loading = false; this.cdr.detectChanges(); }
=======
  constructor(private api: ApiService, public auth: AuthService) {}
  ngOnInit() { this.cargar(); }

  cargar() {
    this.api.get<any[]>('/medicos').subscribe({
      next: d => { this.medicos = d; this.loading = false; },
      error: () => this.loading = false
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
    });
  }

  formVacio() {
    return { num_doc_m:'', nom_m:'', ape_m:'', num_lic:'', telefono_m:'', correo_m:'', direc_m:'', ID_tipo_doc:1, ID_genero:1, ID_especialidad:'', ID_ciudad:'' };
  }

  nuevo() { this.form = this.formVacio(); this.editando = null; this.mostrarForm = true; }
<<<<<<< HEAD

=======
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
  editar(m: any) { this.form = { ...m }; this.editando = m.ID_medico; this.mostrarForm = true; }

  guardar() {
    const obs = this.editando
      ? this.api.put(`/medicos/${this.editando}`, this.form)
      : this.api.post('/medicos', this.form);
<<<<<<< HEAD
    obs.subscribe({ 
      next: () => { this.cargar(); this.mostrarForm = false; }, 
      error: (e) => alert(e.error?.message || 'Error') 
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar este médico?')) return;
=======
    obs.subscribe({ next: () => { this.cargar(); this.mostrarForm = false; }, error: (e) => alert(e.error?.message || 'Error') });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar este medico?')) return;
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
    this.api.delete(`/medicos/${id}`).subscribe(() => this.cargar());
  }
}