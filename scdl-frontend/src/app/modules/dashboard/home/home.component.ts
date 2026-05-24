import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  stats = { pacientes: 0, medicos: 0, citas: 0, sedes: 0 };
  user: any;

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.api.get<any[]>('/pacientes').subscribe(d => this.stats.pacientes = d.length);
    this.api.get<any[]>('/medicos').subscribe(d => this.stats.medicos = d.length);
    this.api.get<any[]>('/citas').subscribe(d => this.stats.citas = d.length);
    this.api.get<any[]>('/sedes').subscribe(d => this.stats.sedes = d.length);
  }
}