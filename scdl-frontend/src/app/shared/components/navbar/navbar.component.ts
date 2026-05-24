import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})
export class NavbarComponent {
  user: any;
  constructor(public auth: AuthService) { this.user = auth.getUser(); }

  getRoleName(): string {
    const roles: any = { 1: 'superadmin', 2: 'admin', 3: 'usuario', 4: 'consultas' };
    return roles[this.auth.getRole()] || 'usuario';
  }
  logout() { this.auth.logout(); }
}