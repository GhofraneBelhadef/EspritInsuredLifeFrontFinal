import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from 'src/app/service/LoanManagement/customer.service';
import { Customer } from 'src/app/models/LoanManagement/Customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  error = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  navigateToAddCustomer(): void {
    this.router.navigate(['/customers/add']);
  }

  addLoan(customerId: number | undefined): void {
    if (customerId) {
      this.router.navigate(['/loanmanagement/add'], { queryParams: { customerId } });
    }
  }

  deleteCustomer(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c.idCustomer !== id);
        },
        error: (err: HttpErrorResponse) => {
          this.error = `Error deleting customer: ${err.message}`;
        }
      });
    }
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = `Error loading customers: ${err.message}`;
        this.loading = false;
      }
    });
  }
}