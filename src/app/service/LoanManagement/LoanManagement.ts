  import { Injectable } from '@angular/core';
  import { HttpClient, HttpParams } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { LoanRequest, LoanPredictionResponse } from '../../models/LoanManagement/LoanRequest.model';
  import { Loan } from '../../models/LoanManagement/Loan.model';
  @Injectable({
    providedIn: 'root'
  })
  export class LoanManagementService {
    private baseUrl = 'http://localhost:9090';

    constructor(private http: HttpClient) { }

    // Add this method to get a single loan by ID
    getLoanById(id: number): Observable<Loan> {
      return this.http.get<Loan>(`${this.baseUrl}/loans/${id}`);
    }

    // Keep your existing methods
    applyForLoan(loanRequest: LoanRequest): Observable<LoanPredictionResponse> {
      return this.http.post<LoanPredictionResponse>(`${this.baseUrl}/loans/apply-for-loan`, loanRequest);
    }

    getAllLoans(): Observable<Loan[]> {
      return this.http.get<Loan[]>(`${this.baseUrl}/loans`);
    }

    createLoan(loan: Loan): Observable<Loan> {
      return this.http.post<Loan>(`${this.baseUrl}/loans/create`, loan);
    }

    deleteLoan(id: number){
      return this.http.delete(`${this.baseUrl}/loans/`+id)
    }
    getMonthlyPayment(id: number) {
      return this.http.get(this.baseUrl+'/loans/'+id+'/monthly-payment')
    }
    updateLoan(id: number, loan: Loan){
      return this.http.put(this.baseUrl+"/loans/"+id,loan)
    }
    getLoanAnalytics(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/loans/analytics`);
    }
    getLoanAnalyticsById(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/loans/analytics/${id}`);
    }
    getTotalInterest(id: number): Observable<number> {
      return this.http.get<number>(`${this.baseUrl}/loans/${id}/total-interest`);
    }
    searchLoans(customerId?: number, status?: string, minAmount?: number, maxAmount?: number): Observable<Loan[]> {
      let params = new HttpParams();
      if (customerId !== undefined) {
        params = params.set('customerId', customerId.toString());
      }
      if (status) {
        params = params.set('status', status);
      }
      if (minAmount !== undefined) {
        params = params.set('minAmount', minAmount.toString());
      }
      if (maxAmount !== undefined) {
        params = params.set('maxAmount', maxAmount.toString());
      }

      return this.http.get<Loan[]>(`${this.baseUrl}/loans/search`, { params });
    }
  }