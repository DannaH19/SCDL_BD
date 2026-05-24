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
  logout() { this.auth.logout(); }
}