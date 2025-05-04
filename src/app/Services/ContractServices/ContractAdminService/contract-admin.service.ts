import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from 'src/app/models/ContractModel/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractAdminService {
  private baseUrl = 'http://localhost:8080/contracts'; // Base URL

  constructor(private http: HttpClient) {}

  // Récupérer tous les contrats
  getAllContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.baseUrl}/all`);
  }

  // Récupérer un contrat par son ID
  getContractById(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${this.baseUrl}/${id}`);
  }

  // Ajouter un contrat
  addContract(contract: Contract): Observable<Contract> {
    // Assurez-vous que le token d'authentification est disponible
    const token = localStorage.getItem('authToken'); // Exemple avec le stockage local

    // Si le token existe, ajoutez-le aux headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<Contract>(`${this.baseUrl}/add`, contract, { headers });
  }

  // Mettre à jour un contrat
  updateContract(id: number, contract: Contract): Observable<Contract> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
    return this.http.put<Contract>(`${this.baseUrl}/update/${id}`, contract, { headers });
  }

  // Supprimer un contrat
  deleteContract(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
    return this.http.delete<void>(`${this.baseUrl}/remove/${id}`, { headers });
  }
}
