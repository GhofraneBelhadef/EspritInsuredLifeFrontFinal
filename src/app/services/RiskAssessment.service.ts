import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiskAssessmentService {
  private apiUrl = 'http://localhost:8080/RiskAssessment'; // URL de ton backend

  constructor(private http: HttpClient) {}

  // ✅ Méthode pour obtenir un RiskAssessment par ID
  getRiskAssessmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getAllRiskAssessments(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/RiskAssessment');
  }
  
  // ✅ Méthode pour obtenir l’historique des facteurs de risque
  getRiskFactorHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/risk-factors/history/${userId}`);
  }

  // ✅ Méthode pour créer un RiskAssessment
  createRiskAssessment(userId: number, medicalRecord: File, riskFactorIds: number[], userWhatsapp: string): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId.toString());

    if (medicalRecord) {
      formData.append('medicalRecord', medicalRecord);
    }

    if (riskFactorIds && riskFactorIds.length > 0) {
      riskFactorIds.forEach(id => {
        formData.append('riskFactorIds', id.toString());
      });
    }

    if (userWhatsapp) {
      formData.append('userWhatsapp', userWhatsapp);
    }

    return this.http.post<any>(this.apiUrl, formData);
  }

  // ✅ Nouvelle méthode pour récupérer le nombre total de RiskAssessments
  getTotalRiskAssessments(): Observable<any> {
    const params = new HttpParams()
      .set('page', 0)
      .set('size', 1); // On demande une page avec 1 seul élément

    return this.http.get<any>(this.apiUrl, { params });
  }
  getAllRiskAssessmentsByPage(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }
  updateRiskAssessment(id: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, updatedData);
  }
  
  searchRiskAssessments(search: string): Observable<any[]> {
    const params = new HttpParams().set('search', search);
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }
  
}
