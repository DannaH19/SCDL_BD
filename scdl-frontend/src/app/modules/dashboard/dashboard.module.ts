import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DashboardComponent }  from './dashboard.component';
import { HomeComponent }       from './home/home.component';
import { NavbarComponent }     from '../../shared/components/navbar/navbar.component';
import { SidebarComponent }    from '../../shared/components/sidebar/sidebar.component';
import { PacientesComponent }  from '../pacientes/pacientes.component';
import { MedicosComponent }    from '../medicos/medicos.component';
import { CitasComponent }      from '../citas/citas.component';
import { SedesComponent }      from '../sedes/sedes.component';
import { UsuariosComponent }   from '../usuarios/usuarios.component';
import { EpsComponent }        from '../eps/eps.component';
import { adminGuard, superadminGuard } from '../../core/guards/rol.guards';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '',           component: HomeComponent },
      { path: 'pacientes',  component: PacientesComponent },
      { path: 'citas',      component: CitasComponent },
      { path: 'medicos',    component: MedicosComponent,   canActivate: [adminGuard] },
      { path: 'sedes',      component: SedesComponent,     canActivate: [adminGuard] },
      { path: 'eps',        component: EpsComponent,       canActivate: [adminGuard] },
      { path: 'usuarios',   component: UsuariosComponent,  canActivate: [superadminGuard] },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent, HomeComponent, NavbarComponent, SidebarComponent,
    PacientesComponent, MedicosComponent, CitasComponent,
    SedesComponent, UsuariosComponent, EpsComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}