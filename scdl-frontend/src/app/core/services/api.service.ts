import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  get<T>(path: string)              { return this.http.get<T>(`/api${path}`, { headers: this.headers() }); }
  post<T>(path: string, body: any)  { return this.http.post<T>(`/api${path}`, body, { headers: this.headers() }); }
  put<T>(path: string, body: any)   { return this.http.put<T>(`/api${path}`, body, { headers: this.headers() }); }
  delete<T>(path: string)           { return this.http.delete<T>(`/api${path}`, { headers: this.headers() }); }
}