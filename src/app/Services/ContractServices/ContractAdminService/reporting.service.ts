import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  private baseUrl = 'http://localhost:8080/api/reports'; // <- chemin correct

  constructor(private http: HttpClient) {}

  getTotalContracts(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/contracts/count`);
  }

  getContractTypeDistribution(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/contracts/type-distribution`);
  }

  getTotalCapital(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/contracts/total-capital`);
  }

  getTotalProvisions(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/provisions/total`);
  }

  getAverageSinistralite(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/sinistralite/stats`);
  }

  downloadExcelReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/excel`, { responseType: 'blob' });
  }
}
