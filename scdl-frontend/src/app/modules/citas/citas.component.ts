import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({ selector: 'app-citas', templateUrl: './citas.component.html', standalone: false })
export class CitasComponent implements OnInit {
  citas: any[] = [];
  loading = true;
  mostrarForm = false;
  editando: any = null;
  form: any = this.formVacio();

  constructor(private api: ApiService) {}
  ngOnInit() { this.cargar(); }

  cargar() {
    this.api.get<any[]>('/citas').subscribe({
      next: d => { this.citas = d; this.loading = false; },
      error: () => this.loading = false
    });
  }

  formVacio() {
    return { fecha_c:'', hora_c:'', estado_c:'Agendada', Motivo_consulta:'', observaciones:'', ID_medico:'', ID_paciente:'', ID_horario:'', ID_usuario:'' };
  }

  nuevo() { this.form = this.formVacio(); this.editando = null; this.mostrarForm = true; }
  editar(c: any) { this.form = { ...c }; this.editando = c.ID_cita; this.mostrarForm = true; }

  guardar() {
    const obs = this.editando
      ? this.api.put(`/citas/${this.editando}`, this.form)
      : this.api.post('/citas', this.form);
    obs.subscribe({ next: () => { this.cargar(); this.mostrarForm = false; }, error: (e) => alert(e.error?.message || 'Error') });
  }

  cancelar(id: number) {
    if (!confirm('¿Cancelar esta cita?')) return;
    this.api.put(`/citas/${id}`, { estado_c: 'Cancelada' }).subscribe(() => this.cargar());
  }
}