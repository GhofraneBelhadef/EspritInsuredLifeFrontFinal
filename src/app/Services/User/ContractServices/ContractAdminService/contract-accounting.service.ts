import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractAccounting } from 'src/app/models/ContractModel/contract-accounting.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContractAccountingService {

  private baseUrl = 'http://localhost:8080/contractAccounting/all'; // Utilisation correcte de baseUrl
  private addUrl = 'http://localhost:8080/contractAccounting/add';
  private apiUrl = 'http://localhost:8080/contractAccounting';
  constructor(private http: HttpClient) {}

  // 🔹 Récupérer tous les ContractAccounting
  getAllContractAccounting(): Observable<ContractAccounting[]> {
    return this.http.get<ContractAccounting[]>(this.baseUrl); // Remplacer apiUrl par baseUrl
  }

  // 🔹 Récupérer un seul par ID
  getContractAccountingById(id: number): Observable<ContractAccounting> {
    return this.http.get<ContractAccounting>(`${this.baseUrl}/${id}`);
  }

  createContractAccounting(accounting: ContractAccounting): Observable<ContractAccounting> {
    return this.http.post<ContractAccounting>(this.addUrl, accounting);
  }

  updateAccounting(id: number, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // ✅ Spécifie le type JSON
    });
  
    return this.http.put(`${this.apiUrl}/update/${id}`, data, { headers });
  }
  

  // Exemple d'endpoint pour obtenir le profit
  getProfit(matriculeFiscale: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/profit/${matriculeFiscale}`);
  }

  // Exemple d'endpoint pour obtenir le bénéfice
  getBenefice(matriculeFiscale: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/benefice/${matriculeFiscale}`);
  }

  // Exemple d'endpoint pour obtenir le bénéfice total
  getBeneficeTotal(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/benefice-total`);
  }
  calculerBenefice(matriculeFiscale: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/benefice/${matriculeFiscale}`);
  }

  // Exemple d'endpoint pour obtenir les provisions
  getTotalProvisions(accountingId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-provisions/${accountingId}`);
  }

  // Exemple d'endpoint pour mettre à jour les indemnités versées
  updateIndemnites(matriculeFiscale: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-indemnites/${matriculeFiscale}`, {});
  }

  // Exemple d'endpoint pour mettre à jour le capital total
  updateTotalCapital(matriculeFiscale: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-total-capital/${matriculeFiscale}`, {});
  }
  addContractAccounting(accounting: ContractAccounting): Observable<ContractAccounting> {
    return this.createContractAccounting(accounting); // Appel à createContractAccounting en lui passant les données
  }
  deleteContractAccounting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}
