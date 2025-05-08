import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Customer } from '../../models/LoanManagement/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:9090/customers';  

  constructor(private http: HttpClient) { }

  // Add createCustomer method
  createCustomer(customer: Customer): Observable<Customer> {
    // Create a new object without the ID and loans
    const customerData = {
      gender: customer.gender,
      maritalStatus: customer.maritalStatus,
      dependent: customer.dependent,
      income: customer.income,
      creditHistory: customer.creditHistory
    };
    
    return this.http.post<Customer>(this.apiUrl, customerData)
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl).pipe(
      tap(response => {
        console.log('Response:', response);
      }),
      catchError(this.handleError)
    );
  }

  getCustomerById(id: number){
    return this.http.get<Customer>(this.apiUrl+ "/" + id)
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}