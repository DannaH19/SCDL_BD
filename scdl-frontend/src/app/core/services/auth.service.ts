import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = '/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.url}/login`, { username, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.usuario));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getToken()   { return localStorage.getItem('token'); }
  isLoggedIn() { return !!this.getToken(); }

  getUser() {
    try {
      const u = localStorage.getItem('user');
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  }

  getRole(): number { return this.getUser()?.rol || 0; }

  isSuperadmin()   { return this.getRole() === 1; }
  isAdministrador(){ return this.getRole() === 2; }
  isUsuario()      { return this.getRole() === 3; }
  isConsultor()    { return this.getRole() === 4; }

  isAdmin()        { return this.getRole() <= 2; }
  canEdit()        { return this.getRole() <= 3; }
  canView()        { return this.getRole() >= 1; }

  getRolNombre(): string {
    const roles: any = { 1:'Superadmin', 2:'Administrador', 3:'Usuario', 4:'Consultor' };
    return roles[this.getRole()] || 'Sin rol';
  }
}