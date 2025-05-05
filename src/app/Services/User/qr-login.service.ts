import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrLoginService {
  private apiUrl = 'http://localhost:8080/api/auth'; // ajuste le chemin si besoin

  constructor(private http: HttpClient) {}

  generateQrCode(username: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/generate-qr/${username}`, { responseType: 'text' });
  }

  validateQrCode(token: string): Observable<string> {
    const params = new HttpParams().set('token', token);
    return this.http.post(`${this.apiUrl}/validate-qr`, null, { params, responseType: 'text' });
  }
}
