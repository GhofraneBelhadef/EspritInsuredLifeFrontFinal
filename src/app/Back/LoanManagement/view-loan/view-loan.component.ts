import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from 'src/app/models/LoanManagement/Loan.model';
import { LoanRequest } from 'src/app/models/LoanManagement/LoanRequest.model';
import { LoanManagementService } from 'src/app/service/LoanManagement/LoanManagement';
import Swal from 'sweetalert2';
import { PdfService } from 'src/app/service/LoanManagement/pdf.service'; 
@Component({
  selector: 'app-view-loan',
  templateUrl: './view-loan.component.html',
  styleUrls: ['./view-loan.component.scss']

})

export class ViewLoanComponent implements OnInit {
  loan: Loan | null = null;
  isLoading: boolean = true;
  isApproving: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanManagementService,
    private pdfService: PdfService

  ) { }

  ngOnInit(): void {
    const loanId = this.route.snapshot.paramMap.get('id');
    const navigationState = this.router.getCurrentNavigation()?.extras.state;

    if (navigationState && navigationState['loan']) {
      this.loan = navigationState['loan'];
      this.isLoading = false;
    } else if (loanId) {
      this.loadLoanDetails(+loanId);
    } else {
      this.router.navigate(['/loanmanagement']);
    }
  }

  loadLoanDetails(loanId: number): void {
    this.loanService.getLoanById(loanId).subscribe({
      next: (loan) => {
        console.log(loan)
        this.loan = loan;
        this.isLoading = false;
      },
      error: () => {
        this.router.navigate(['/loanmanagement']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/loanmanagement']);
  }
  approve() {

    if (!this.loan?.idLoan) {
      console.error('Loan or loan ID is missing');
      return;
    }
    const loanId = this.loan.idLoan;

    if (this.loan?.status != "PENDING") {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Loan already ' + this.loan?.status,

      })
      return
      
    }
    if (this.loan?.loanTerm && this.loan?.loanTerm > 360) {

      this.loan = {
        ...this.loan,
        status: "REJECTED"
      }

      if (!this.loan?.idLoan)
        return


      this.loanService.updateLoan(this.loan.idLoan, this.loan).subscribe(
        
        () => {
          
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Loan term cannot exceed 360 months!',
          })
        },
        (error) => {
          alert("error")
          console.log(error)
        }
      )
      return
    }
    this.isApproving = true;

    let loanRequest: LoanRequest = {
      "gender": this.loan?.customer?.gender == 'M' ? 'Male' : 'Female',
      "married": this.loan?.customer?.maritalStatus == "Married" ? 1 : 0,
      "dependents": this.loan?.customer?.dependent,
      "education": 0,
      "selfEmployed": 1,
      "applicantIncome": this.loan?.applicantIncome,
      "coapplicantIncome": this.loan?.coapplicantIncome,
      "loanAmount": this.loan?.loanAmount,
      "loanTerm": this.loan?.loanTerm,
      "propertyArea": 0
    }

    let income = 0;

    if (this.loan?.applicantIncome) income += this.loan?.applicantIncome;
    if (this.loan?.coapplicantIncome) income += this.loan?.coapplicantIncome;

    this.loanService.getMonthlyPayment(this.loan?.idLoan).subscribe(
      (monthlyPayment: any) => {
        let creditHistory = 0;
        if (income < monthlyPayment) {
          creditHistory = 0
        } else creditHistory = 1

        loanRequest = {
          ...loanRequest,
          "creditHistory": creditHistory
        }

        this.loanService.applyForLoan(loanRequest).subscribe(
          (response) => {
            console.log("Response ML = ", response.status)

            this.loan = {
              ...this.loan,
              status: response.status
            }

            if (!this.loan.idLoan) return;

            this.loanService.updateLoan(this.loan.idLoan, this.loan).subscribe(
              () => {
                if (response.status == "REJECTED") {
                  Swal.fire({
                    icon: 'error',
                    title: 'REJECTED',
                    text: 'Loan was REJECTED by the AI!',
                  });
                } else {
                  this.loan?.idLoan == null
                  
                  // ─── ADD THESE LINES ───
                  this.pdfService.downloadLoanPdf(loanId).subscribe({
                    next: () => console.log(`Loan-${loanId} PDF downloaded`),
                    error: err => {
                      console.error('PDF download failed', err);
                      Swal.fire({
                        icon: 'error',
                        title: 'Download Error',
                        text: 'Could not download loan PDF. Please try again later.',
                      });
                    }
                  });
                  Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Loan approved successfully !',
                  })
                }
                this.isApproving = false; 
                
              },
              (error) => {
                alert("error 1")
                console.log(error)
              }
            )


          },
          (error) => {
            alert("error loan approval")
            console.log(error)
          }
        )
      },
      (error) => {
        alert("error getting monthly payment")
        console.log(error)
      }
    )
  }
}