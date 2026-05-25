import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({ 
  selector: 'app-citas', 
  templateUrl: './citas.component.html', 
  standalone: false 
})
export class CitasComponent implements OnInit {
  citas: any[] = [];
  loading = true;
  mostrarForm = false;
  editando: any = null;
  form: any = { fecha_c:'', hora_c:'', estado_c:'Agendada', ID_medico:0, ID_paciente:0, ID_horario:0, Motivo_consulta:'' };

  constructor(private api: ApiService, public auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading = true;
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    // Si es un paciente (ID_rol 3), enviamos su ID para filtrar las citas
    const url = (user.ID_rol === 3) ? `/citas?pacienteId=${user.Id_Usuario}` : '/citas';

    this.api.get<any[]>(url).subscribe({
      next: d => { this.citas = d; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.loading = false; }
    });
  }

  // ESTA ES LA FUNCIÓN QUE TE DABA ERROR
  cancelar(id: number) {
    if (!confirm('¿Seguro que deseas cancelar?')) return;
    this.api.put(`/citas/${id}`, { estado_c: 'Cancelada' }).subscribe(() => this.cargar());
  }

  nuevo() { this.mostrarForm = true; this.editando = null; }
  editar(c: any) { this.form = { ...c }; this.editando = c.ID_cita; this.mostrarForm = true; }
  guardar() { /* lógica de guardar */ }
}