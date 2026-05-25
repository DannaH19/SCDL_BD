<<<<<<< HEAD
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({ selector: 'app-sedes', templateUrl: './sedes.component.html', standalone: false })
export class SedesComponent implements OnInit {
  sedes: any[] = [];
  loading = true;
  mostrarForm = false;
  editando: any = null;
  form: any = this.formVacio();

<<<<<<< HEAD
  constructor(private api: ApiService, public auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading = true;
    this.api.get<any[]>('/sedes').subscribe({
      next: d => { this.sedes = d; this.loading = false; this.cdr.detectChanges(); },
      error: (e) => { console.log('Error:', e); this.loading = false; this.cdr.detectChanges(); }
=======
  constructor(private api: ApiService, public auth: AuthService) {}
  ngOnInit() { this.cargar(); }

  cargar() {
    this.api.get<any[]>('/sedes').subscribe({
      next: d => { this.sedes = d; this.loading = false; },
      error: () => this.loading = false
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
    });
  }

  formVacio() {
    return { Nom_sede:'', Direc_s:'', Telefono_s:'', Correo_s:'', ID_ciudad:'' };
  }

  nuevo() { this.form = this.formVacio(); this.editando = null; this.mostrarForm = true; }
<<<<<<< HEAD

=======
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
  editar(s: any) { this.form = { ...s }; this.editando = s.ID_sede; this.mostrarForm = true; }

  guardar() {
    const obs = this.editando
      ? this.api.put(`/sedes/${this.editando}`, this.form)
      : this.api.post('/sedes', this.form);
<<<<<<< HEAD
    obs.subscribe({ 
      next: () => { this.cargar(); this.mostrarForm = false; }, 
      error: (e) => alert(e.error?.message || 'Error') 
    });
=======
    obs.subscribe({ next: () => { this.cargar(); this.mostrarForm = false; }, error: (e) => alert(e.error?.message || 'Error') });
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar esta sede?')) return;
    this.api.delete(`/sedes/${id}`).subscribe(() => this.cargar());
  }
}