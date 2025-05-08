import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/LoanManagement/Customer.model';
import { Loan } from 'src/app/models/LoanManagement/Loan.model';
import { LoanRequest } from 'src/app/models/LoanManagement/LoanRequest.model';
import { CustomerService } from 'src/app/service/LoanManagement/customer.service';
import { LoanManagementService } from 'src/app/service/LoanManagement/LoanManagement';
import { SpeechSynthesisService } from 'src/app/service/LoanManagement/speech-synthesis';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  showModal = false;
  showModalAddLoan = false;
  showModalDetails = false;
  messages: {text: string, sender: 'bot' | 'user'}[] = [];
  isSpeaking = false;
  userInput = '';

  tabShow: string = "details";

  detailsLoan: Loan | undefined;
  loanForm: FormGroup;

  currentCustomer: Customer | undefined;
  currentLoans: Loan[] | undefined;
  customer: Customer = {
    idCustomer: 0,
    gender: '',
    maritalStatus: '',
    dependent: 0,
    income: 0,
    creditHistory: 0,
    loans: []
  };
  error = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private loanService: LoanManagementService,
    private router: Router,
    private speechService: SpeechSynthesisService
  ) {

    this.loanForm = this.fb.group({
      loanAmount: ['', [Validators.required, Validators.min(0)]],
      loanTerm: ['', [Validators.required, Validators.min(1)]],
      coapplicantIncome: ['', [Validators.min(0)]]

    });
  }

  ngOnInit() {


    let customerId = localStorage.getItem("clientId")
    if (customerId) {
      this.customerService.getCustomerById(parseInt(customerId)).subscribe(
        (customer) => {
          console.log(customer)
          this.currentCustomer = customer
        },
        (error) => {
          localStorage.removeItem('clientId')
        }
      )
      this.loadLoansOfCustomer(parseInt(customerId))
    }
  }

  onSubmit(): void {
    if (this.customer.dependent > 3 || this.customer.dependent < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Number of dependent shouldn't be above 3 or below 0"
      })
      return;
    }
    if (this.customer.income < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Income shouldn't be negative"
      })
      return;
    }
    this.customerService.createCustomer(this.customer).subscribe({
      next: (customer) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Thank you for trusting our insurance'
        })
        this.showModal = false;

        this.currentCustomer = customer;

        if (customer.idCustomer)
          this.loadLoansOfCustomer(customer.idCustomer)


        localStorage.setItem("clientId", String(customer.idCustomer))

        this.resetCustomerForm()
      },
      error: (err) => {
        this.error = err.message || 'Error creating customer';
      }
    });
  }
  openClientModal() {
    
    this.showModal = true;
  }

  openLoanModal() {
    
    this.showModalAddLoan = true;
  }


  closeClientModal() {
    this.showModal = false;
    this.showModalAddLoan = false;

    this.showModalDetails = false;
    this.detailsLoan = undefined;
    this.resetCustomerForm()
    
    this.speechService.cancel();
  }

  resetCustomerForm() {

    this.customer = {
      idCustomer: 0,
      gender: '',
      maritalStatus: '',
      dependent: 0,
      income: 0,
      creditHistory: 0,
      loans: []
    };
  }

  removeCustomer() {
    if (this.currentLoans && this.currentLoans?.length > 0) {
      this.deleteLoansOneByOne(0);
    } else {
      this.deleteCustomer();
    }
  }

  private deleteLoansOneByOne(index: number) {
    if (!this.currentLoans) return this.deleteCustomer();

    if (index >= this.currentLoans.length) {
      this.deleteCustomer();
      return;
    }

    const loan = this.currentLoans[index];
    if (!loan.idLoan) {
      this.deleteLoansOneByOne(index + 1);
      return;
    }

    this.loanService.deleteLoan(loan.idLoan).subscribe({
      next: () => {
        this.deleteLoansOneByOne(index + 1);
      },
      error: (err) => {
        console.error(`Failed to delete loan ${loan.idLoan}:`, err);
        this.deleteLoansOneByOne(index + 1);
      }
    });
  }

  deleteCustomer() {
    if (!this.currentCustomer?.idCustomer) return

    this.customerService.deleteCustomer(this.currentCustomer?.idCustomer).subscribe(
      () => {

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'You removed your customer ship'
        })
        localStorage.removeItem('clientId')
        this.currentCustomer = undefined;
        this.currentLoans = undefined;
      },
      (error) => {
        alert("error")
        console.log(error)
      }
    )
  }

  loadLoansOfCustomer(customerId: number) {
    this.loanService.searchLoans(customerId).subscribe(
      (loans) => {
        console.log(loans)
        loans.forEach(loan => {
          this.predictLoan(loan)
        })
        this.currentLoans = loans;
      },
      (error) => {
        alert("error loading loans");
        console.log(error)
      }
    )
  }

  removeLoan(idLoan: number | undefined) {
    if (!idLoan) return


    this.loanService.deleteLoan(idLoan).subscribe(
      () => {
        if (!this.currentCustomer?.idCustomer) return

        this.loadLoansOfCustomer(this.currentCustomer?.idCustomer)
      },
      (error) => {
        alert("error loading loans");
        console.log(error)
      }
    )
  }


  onSubmitLoan() {
    if (this.loanForm.valid && this.currentCustomer) {
      let idCustomer = this.currentCustomer.idCustomer

      if (!idCustomer) return

      let loanRequest: Loan = {
        ...this.loanForm.value,
        customer: {
          idCustomer: idCustomer,
        },
        interestRate: 8.5,
        status: "PENDING",
        credit: null,
        riskBreakdown: null
      };


      this.customerService.getCustomerById(idCustomer).subscribe(
        (customer) => {
          loanRequest = {
            ...loanRequest,
            applicantIncome: customer.income
          }
          this.loanService.createLoan(loanRequest).subscribe(
            (response: Loan) => {
              console.log('Loan application submitted:', response);

              if (idCustomer)
                this.loadLoansOfCustomer(idCustomer)

              this.closeClientModal()
            },
            (error: Error) => {
              console.error('Error submitting loan application:', error);
              alert("Error Loan application")
              this.error = error.message || 'Error processing loan application';
            }
          );
        },
        (error) => {
          console.error('Error submitting loan application for customer:', error);
          alert("Customer error")
        }
      )

    }
  }


  predictLoan(loan: Loan | undefined) {

    if (!loan) return


    let rejected = false;
    let rejectionReason = "";

    if (loan?.loanTerm && loan?.loanTerm > 360) {
      rejected = true
      rejectionReason = "Loan term too long"
    }


    if (loan?.loanTerm && loan?.loanTerm < 12) {
      rejected = true
      rejectionReason = "Loan term too short"
    }

    if (rejected) {
      loan.predictionResult = {
        confidenceScore: 1,
        prediction_result: "rejected",
        approvalProbability: 0,
        rejectionProbability: 1,
        status: "REJECTED",
        rejectionReason: rejectionReason
      };
      return
    }

    let loanRequest: LoanRequest = {
      "gender": loan?.customer?.gender == 'M' ? 'Male' : 'Female',
      "married": loan?.customer?.maritalStatus == "Married" ? 1 : 0,
      "dependents": loan?.customer?.dependent,
      "education": 0,
      "selfEmployed": 1,
      "applicantIncome": loan?.applicantIncome,
      "coapplicantIncome": loan?.coapplicantIncome,
      "loanAmount": loan?.loanAmount,
      "loanTerm": loan?.loanTerm,
      "propertyArea": 0
    }

    let income = 0;

    if (loan?.applicantIncome) income += loan?.applicantIncome;
    if (loan?.coapplicantIncome) income += loan?.coapplicantIncome;

    if (!loan.idLoan) return

    this.loanService.getMonthlyPayment(loan.idLoan).subscribe(
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
          (response: any) => {
            console.log("Response ML = ", response)
            loan.predictionResult = {
              confidenceScore: response.confidenceScore,
              prediction_result: response.prediction_result,
              approvalProbability: response.approvalProbability,
              rejectionProbability: response.rejectionProbability,
              status: response.status,
              timestamp: response.timestamp
            };

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

  showTips(){
    this.tabShow = 'tips';

    this.addBotMessage("Hello! I'm here to help you with loan improvement tips. Would you like me to analyze your loan details?");
  }

  viewLoanDetails(idLoan: number | undefined) {
    if (!idLoan) return;

    this.showModalDetails = true;
    this.tabShow = 'details';
    this.loanService.getLoanById(idLoan).subscribe(
      (loan) => {
        this.detailsLoan = loan;

        this.predictLoan(loan)
        console.log(loan)
      },
      (error) => {
        alert("error")
        console.log(error)
      }
    )
  }

  generateLoanTips(loan: Loan | undefined): string[] {
    const tips: string[] = [];
    
    if (!loan) return tips;
  
    // Interest rate tips
    if (!loan?.interestRate) return tips

    // Loan term tips
    if (!loan?.loanTerm ) return tips
    if (loan?.loanTerm > 48) {
      tips.push("A longer loan term means lower monthly payments, but you'll pay more in interest over time.");
    } else if (loan?.loanTerm< 24) {
      tips.push("A shorter loan term means higher monthly payments, but you'll save on interest.");
    }
  
    // Loan amount tips
    if (!loan?.loanAmount  ) return tips
    if (loan?.loanAmount > 200000) {
      tips.push("Large loan amounts require careful financial planning to ensure timely repayment.");
    } else if (loan?.loanAmount < 50000) {
      tips.push("Smaller loan amounts are generally easier to manage.");
    }
  
    // Combined conditions
    if (loan?.interestRate > 7.0 && loan?.loanTerm > 60) {
      tips.push("High interest rate and long term: Consider refinancing in the future for better terms.");
    }
  
    if (loan?.loanAmount > 150000 && loan?.loanTerm  < 24) {
      tips.push("Very large loan amount with a short term, be sure you can make the large payments");
    }
  
    // Always show this one
    tips.push("Always review the loan agreement carefully before signing.");
  
    return tips;
  }
  
  toggleVoice() {
    if (!this.isSpeaking) {
      this.speechService.cancel();
    } else if (this.messages.length > 0) {
      this.speechService.speak(this.messages[this.messages.length - 1].text);
    }
    this.isSpeaking = !this.isSpeaking;
  }
  
  addBotMessage(text: string) {
    this.messages.push({text, sender: 'bot'});
    this.speechService.speak(text);

  }
  
  handleUserResponse() {
    const userText = this.userInput.trim();
    if (userText) {
      this.messages.push({text: userText, sender: 'user'});
      this.userInput = '';
      
      if (userText.toLowerCase().includes('yes') || userText.toLowerCase().includes('analyze')) {
        const tips = this.generateLoanTips(this.detailsLoan);
        if (tips.length > 0) {
          let tipsString = "Here are some personalized tips to improve your loan: \n";
          tips.forEach(tip => tipsString += tip + " \n");
          this.addBotMessage(tipsString)
        } else {
          this.addBotMessage("I couldn't generate specific tips for this loan. Here are some general suggestions...");
        }
      } else {
        this.addBotMessage("How else can I help you with your loan?");
      }
    }
  }

}
