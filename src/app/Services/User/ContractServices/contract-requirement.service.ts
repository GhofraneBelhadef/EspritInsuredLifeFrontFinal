import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContractRequestService {
  private apiUrl = 'http://localhost:8080/contract-request';

  constructor(private http: HttpClient) {}

  sendRequest(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
