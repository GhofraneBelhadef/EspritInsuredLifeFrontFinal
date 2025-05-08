// pdf.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiUrl = 'http://localhost:9090/loans';

  constructor(private http: HttpClient) { }

 
  generateLoanPdf(loanId: number): Observable<Blob> {
   return this.http.get(`${this.apiUrl}/${loanId}/generate-pdf`, {
      responseType: 'blob'
    });
  }
  downloadLoanPdf(loanId: number, fileName?: string): Observable<void> {
    console.log('Attempting to download PDF for loan:', loanId);
    return new Observable(observer => {
      this.generateLoanPdf(loanId).subscribe({
        next: (blob) => {
          try {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName || `loan-details-${loanId}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            observer.next();
            observer.complete();
          } catch (e) {
            observer.error(e);
          }
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
