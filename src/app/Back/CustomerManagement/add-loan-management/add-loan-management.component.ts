import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoanManagementService } from 'src/app/service/LoanManagement/LoanManagement';
import { LoanRequest } from 'src/app/models/LoanManagement/LoanRequest.model';
import { LoanPredictionResponse } from 'src/app/models/LoanManagement/LoanRequest.model';
import { Loan } from 'src/app/models/LoanManagement/Loan.model';
import { CustomerService } from 'src/app/service/LoanManagement/customer.service';

@Component({
  selector: 'app-add-loan-management',
  templateUrl: './add-loan-management.component.html',
  styleUrls: ['./add-loan-management.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddLoanManagementComponent implements OnInit {
  loanForm: FormGroup;
  customerId: number | null = null;
  predictionResult: LoanPredictionResponse | null = null;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private loanService: LoanManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.loanForm = this.fb.group({
      loanAmount: ['', [Validators.required, Validators.min(0)]],
      loanTerm: ['', [Validators.required, Validators.min(1)]],
      coapplicantIncome: ['', [Validators.min(0)]]
      
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        if (params['customerId']) {
          this.customerId = params['customerId'];
        }
      }
    );
  }

  onSubmit() {
    if (this.loanForm.valid && this.customerId) {
      let loanRequest: Loan = {
        ...this.loanForm.value,
        customer: {
          idCustomer: this.customerId,
        },
        interestRate: 8.5,
        status: "PENDING",
        credit: null,
        riskBreakdown: null
      };
      
      this.customerService.getCustomerById(this.customerId).subscribe(
        (customer)=>{
          loanRequest = {
            ...loanRequest,
            applicantIncome: customer.income
          }
          this.loanService.createLoan(loanRequest).subscribe(
            (response: Loan) => {
              console.log('Loan application submitted:', response);
              this.router.navigate(['/loanmanagement']);
            },
            (error: Error) => {
              console.error('Error submitting loan application:', error);
              alert("Error Loan application")
              this.error = error.message || 'Error processing loan application';
            }
          );
        },
        (error)=>{
          console.error('Error submitting loan application for customer:', error);
          alert("Customer error")
        }
      )
      
    }
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }
}
