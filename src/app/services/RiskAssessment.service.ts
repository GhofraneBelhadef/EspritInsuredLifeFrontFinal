import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiskAssessmentService {
  private apiUrl = 'http://localhost:8080/RiskAssessment'; // URL de ton backend

  constructor(private http: HttpClient) {}
  getRiskAssessmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  createRiskAssessment(userId: number, medicalRecord: File, riskFactorIds: number[], userWhatsapp: string): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId.toString()); // 👈 envoyer userId
    
    if (medicalRecord) {
      formData.append('medicalRecord', medicalRecord); // 👈 envoyer fichier PDF
    }
    
    if (riskFactorIds && riskFactorIds.length > 0) {
      // 🔥 Ajouter chaque facteur de risque séparément
      riskFactorIds.forEach(id => {
        formData.append('riskFactorIds', id.toString());
      });
    }
    
    if (userWhatsapp) {
      formData.append('userWhatsapp', userWhatsapp); // 👈 envoyer numéro WhatsApp
    }
  
    return this.http.post<any>(this.apiUrl, formData);
  }
}
