import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      email: email,
      password: password
    }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('travlr-token', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('travlr-token');
  }

  getToken(): string | null {
    return localStorage.getItem('travlr-token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}