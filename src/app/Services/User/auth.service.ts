import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:9090/api/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return this.http.post(url, {});
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.role || null;
    } catch (e) {
      console.error('Erreur lors du décodage du token', e);
      return null;
    }
  }
  forgotPassword(email: string): Observable<any> {
    const url = `http://localhost:9090/api/auth/forgot-password?email=${encodeURIComponent(email)}`;
    return this.http.post(url, {}); // Post sans body, juste pour respecter Swagger
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = `http://localhost:9090/api/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`;
    return this.http.post(url, {}); // 👈 POST sans body
  }
  getUserProfile() {
    const token = this.getToken();
    console.log('TOKEN:', token); // <-- Ajoute ceci
    return this.http.get('http://localhost:9090/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  deleteAccount(id: number) {
    const token = this.getToken(); // Récupère le token
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    return this.http.delete('http://localhost:9090/api/users/' + id, { headers, responseType: 'text' });
  }
  updateUser(id: number, data: any): Observable<any> {
    const token = this.getToken(); // Récupère le token JWT
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    return this.http.put(`http://localhost:9090/api/users/${id}`, data, { headers });
  }
  updatePhoto(id: number, formData: FormData): Observable<any> {
    const token = this.getToken();
    return this.http.put(`http://localhost:9090/api/users/${id}/photo`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  getAllUsers(page: number, size: number): Observable<any> {
    const token = this.getToken();  // Récupère le token depuis le localStorage
    const headers = {
      'Authorization': `Bearer ${token}`  // Ajoute le token dans les en-têtes
    };
  
    return this.http.get<any>(`http://localhost:9090/api/users?page=${page}&size=${size}`, { headers });
  }
  deleteUser(id: number) {
    const token = this.getToken(); // Récupère le token
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    return this.http.delete('http://localhost:9090/api/users/' + id, { headers, responseType: 'text' });
  }
  searchUsers(query: string, page: number, size: number) {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`http://localhost:9090/api/users/search?username=${query}&page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  


  
  
  
}

