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

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '',          component: HomeComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'medicos',   component: MedicosComponent },
      { path: 'citas',     component: CitasComponent },
      { path: 'sedes',     component: SedesComponent },
      { path: 'usuarios',  component: UsuariosComponent },
      { path: 'eps',       component: EpsComponent },
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