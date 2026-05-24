import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  form: FormGroup;
  error   = '';
  loading = false;

  mostrarRegistro = false;
  errorReg  = '';
  exitoReg  = '';
  regForm = {
    username:   '',
    password:   '',
    Nom_comp:   '',
    correo_u:   '',
    telefono_u: '',
    ID_rol:     3,
    estado_u:   true,
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error   = '';
    const { username, password } = this.form.value;
    this.auth.login(username!, password!).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => {
        this.error   = e.error?.message || 'Credenciales incorrectas.';
        this.loading = false;
      },
    });
  }

  registrar() {
    this.errorReg = '';
    this.exitoReg = '';
    if (!this.regForm.username || !this.regForm.password || !this.regForm.Nom_comp) {
      this.errorReg = 'Nombre, usuario y contraseña son obligatorios.';
      return;
    }
    if (this.regForm.password.length < 6) {
      this.errorReg = 'La contraseña debe tener mínimo 6 caracteres.';
      return;
    }
    this.http.post('/api/auth/register', this.regForm).subscribe({
      next: () => {
        this.exitoReg = '¡Cuenta creada! Ya puedes iniciar sesión.';
        this.regForm  = { username:'', password:'', Nom_comp:'', correo_u:'', telefono_u:'', ID_rol:3, estado_u:true };
        setTimeout(() => { this.mostrarRegistro = false; this.exitoReg = ''; }, 2000);
      },
      error: (e) => {
        this.errorReg = e.error?.message || 'Error al crear la cuenta.';
      },
    });
  }
}