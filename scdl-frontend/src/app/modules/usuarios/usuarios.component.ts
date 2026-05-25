<<<<<<< HEAD
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
import { ApiService } from '../../core/services/api.service';

@Component({ selector: 'app-usuarios', templateUrl: './usuarios.component.html', standalone: false})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  loading = true;

<<<<<<< HEAD
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.loading = true;
    this.api.get<any[]>('/usuarios').subscribe({ 
      next: d => { this.usuarios = d; this.loading = false; this.cdr.detectChanges(); }, 
      error: (e) => { console.log('Error:', e); this.loading = false; this.cdr.detectChanges(); }
    });
=======
  constructor(private api: ApiService) {}
  ngOnInit() { this.cargar(); }

  cargar() {
    this.api.get<any[]>('/usuarios').subscribe({ next: d => { this.usuarios = d; this.loading = false; }, error: () => this.loading = false });
>>>>>>> b7481c0deaf9e9ec79c88b181cc371d556fb4288
  }

  getRolNombre(rol: number): string {
    const roles: any = { 1: 'Superadmin', 2: 'Admin', 3: 'Usuario', 4: 'Consultas' };
    return roles[rol] || 'Desconocido';
  }

  getRolClass(rol: number): string {
    const clases: any = { 1: 'badge-superadmin', 2: 'badge-admin', 3: 'badge-usuario', 4: 'badge-consultas' };
    return clases[rol] || '';
  }

  desactivar(id: number) {
    if (!confirm('¿Desactivar este usuario?')) return;
    this.api.delete(`/usuarios/${id}`).subscribe(() => this.cargar());
  }
}