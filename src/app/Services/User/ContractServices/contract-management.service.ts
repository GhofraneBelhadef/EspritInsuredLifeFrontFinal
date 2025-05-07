import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Contract } from 'src/app/models/ContractModel/contract.model';
import { ContractRequest } from 'src/app/models/ContractModel/contract-request.model';
import { AuthService } from 'src/app/Services/User/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContractManagementService {

  private baseUrl = 'http://localhost:8080/contracts'; // Assure-toi que ce soit bien l'URL de ton backend

  constructor(private http: HttpClient,
    private authService: AuthService) {}

  /**
   * 🔹 Récupère tous les contrats d’un utilisateur
   * @param userId ID de l'utilisateur
   * @returns Liste des contrats
   */
  getContractsByUserId(userId: number): Observable<Contract[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(`${this.baseUrl}/user/${userId}`, { 
      headers,
      responseType: 'text' // Get raw text response
    }).pipe(
      map(response => {
        try {
          // Clean the response if needed
          const cleanedResponse = response
            .replace(/\\"/g, '"') // Fix escaped quotes
            .replace(/:\s*undefined/g, ':null'); // Replace undefined with null
          
          return JSON.parse(cleanedResponse) as Contract[];
        } catch (e) {
          console.error('Failed to parse:', response);
          throw new Error('Invalid contract data from server');
        }
      })
    );
  }


  /**
   * 🔹 Envoie une demande de création de contrat
   * @param request Données de la demande
   * @param userId ID de l'utilisateur
   * @returns Résultat de la requête
   */
  // Corrigez l'URL pour matcher le endpoint backend
sendContractRequest(request: ContractRequest): Observable<any> {
  const token = this.authService.getToken();
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  // Utilisez la même structure que votre backend
  return this.http.post(`${this.baseUrl}/add`, request, { 
    headers,
    observe: 'response'
  });
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
