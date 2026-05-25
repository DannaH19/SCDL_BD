<<<<<<< HEAD
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({ selector: 'app-citas', templateUrl: './citas.component.html', standalone: false })
export class CitasComponent implements OnInit {
  citas: any[] = [];
  loading = true;
  mostrarForm = false;
  editando: any = null;
  form: any = this.formVacio();

<<<<<<< HEAD
  constructor(private api: ApiService, public auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading = true;
    this.api.get<any[]>('/citas').subscribe({
      next: d => { this.citas = d; this.loading = false; this.cdr.detectChanges(); },
      error: (e) => { console.log('Error:', e); this.loading = false; this.cdr.detectChanges(); }
=======
  constructor(private api: ApiService, public auth: AuthService) {}
  ngOnInit() { this.cargar(); }

  cargar() {
    this.api.get<any[]>('/citas').subscribe({
      next: d => { this.citas = d; this.loading = false; },
      error: () => this.loading = false
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
    });
  }

  formVacio() {
    return { fecha_c:'', hora_c:'', estado_c:'Agendada', Motivo_consulta:'', observaciones:'', ID_medico:'', ID_paciente:'', ID_horario:'', ID_usuario:'' };
  }

  nuevo() { this.form = this.formVacio(); this.editando = null; this.mostrarForm = true; }
<<<<<<< HEAD

=======
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
  editar(c: any) { this.form = { ...c }; this.editando = c.ID_cita; this.mostrarForm = true; }

  guardar() {
    const obs = this.editando
      ? this.api.put(`/citas/${this.editando}`, this.form)
      : this.api.post('/citas', this.form);
<<<<<<< HEAD
    obs.subscribe({ 
      next: () => { this.cargar(); this.mostrarForm = false; }, 
      error: (e) => alert(e.error?.message || 'Error') 
    });
=======
    obs.subscribe({ next: () => { this.cargar(); this.mostrarForm = false; }, error: (e) => alert(e.error?.message || 'Error') });
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
  }

  cancelar(id: number) {
    if (!confirm('¿Cancelar esta cita?')) return;
    this.api.put(`/citas/${id}`, { estado_c: 'Cancelada' }).subscribe(() => this.cargar());
  }
}