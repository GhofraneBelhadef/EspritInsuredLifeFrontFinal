import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // Add RouterModule import
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/LoanManagement/customer.service';
import { Customer } from 'src/app/models/LoanManagement/Customer.model';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class CustomerAddComponent {
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
    private customerService: CustomerService,
    private router: Router
  ) {}

  // Add this method
  cancel(): void {
    this.router.navigate(['/customers']);
  }

  onSubmit(): void {
    this.customerService.createCustomer(this.customer).subscribe({
      next: () => {
        this.router.navigate(['/customers']);
      },
      error: (err) => {
        this.error = err.message || 'Error creating customer';
      }
    });
  }
}
