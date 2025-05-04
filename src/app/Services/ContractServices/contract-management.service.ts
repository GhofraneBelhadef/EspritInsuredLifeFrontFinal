import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from 'src/app/models/ContractModel/contract.model';
import { ContractRequest } from 'src/app/models/ContractModel/contract-request.model';

@Injectable({
  providedIn: 'root'
})
export class ContractManagementService {

  private baseUrl = 'http://localhost:8080/contracts'; // Assure-toi que ce soit bien l'URL de ton backend

  constructor(private http: HttpClient) {}

  /**
   * 🔹 Récupère tous les contrats d’un utilisateur
   * @param userId ID de l'utilisateur
   * @returns Liste des contrats
   */
  getContractsByUserId(userId: number): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.baseUrl}/user/${userId}`);
  }

  /**
   * 🔹 Envoie une demande de création de contrat
   * @param request Données de la demande
   * @param userId ID de l'utilisateur
   * @returns Résultat de la requête
   */
  sendContractRequest(request: ContractRequest, userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/request/${userId}`, request);
  }

  /**
   * 🔹 Annule un contrat par son ID
   * @param contractId ID du contrat
   * @returns Résultat de l'opération
   */
  cancelContract(contractId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/cancel/${contractId}`, {});
  }
}
