import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/usuarios'; // URL base del backend

  constructor(private http: HttpClient) { }

  login(nombre: string, password: string): Observable<any> {
    const body = { nombre, password };
    return this.http.post(`${this.baseUrl}/login`, body); // POST a /usuarios/login
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
