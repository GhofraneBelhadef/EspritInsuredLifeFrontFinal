import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/LoanManagement/Loan.model';
import { LoanManagementService } from 'src/app/service/LoanManagement/LoanManagement';

declare var Chart: any;

@Component({
  selector: 'app-list-back-loan-management',
  templateUrl: './list-back-loan-management.component.html',
  styleUrls: ['./list-back-loan-management.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ListBackLoanManagementComponent {
  @ViewChild('statusChart', { static: true }) statusChartRef!: ElementRef;
  @ViewChild('termChart') termChartRef!: ElementRef;

  statusChart: any;
  termChart: any;
  currentChart: string = 'status';

  analyticsData: any;
  isLoadingAnalytics = false;
  loans: Loan[] = [];
  chartDataReady = false;
  filteredLoans: Loan[] = [];
  math = Math;

  searchText: string = '';
  sortColumn: string = 'idLoan';
  sortDirection: string = 'asc';

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  currentStatusFilter: string = 'ALL';

  constructor(
    private loanService: LoanManagementService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void { // Use ngAfterViewInit instead of ngOnInit
    console.log("testing: ", this.statusChartRef); // Should now be defined

    this.loadAnalyticsData()

    this.loadLoans();
  }


  filterChartsByStatus(status: string): void {
    this.currentStatusFilter = status;
    this.createCharts();
  }

  loadAnalyticsData() {
    this.isLoadingAnalytics = true;
    this.loanService.getLoanAnalytics().subscribe({
      next: (data) => {
        this.analyticsData = data;
        this.isLoadingAnalytics = false;

      },
      error: (err) => {
        console.error('Error loading analytics:', err);
        this.isLoadingAnalytics = false;
      }
    });
  }


  showStatusChart() {
    this.currentChart = 'status';
  }

  showTermChart() {
    this.currentChart = 'terms';
  }
  createCharts(): void {
    if (!this.statusChartRef?.nativeElement && !this.termChartRef?.nativeElement) {
      console.log("id chart incorrect")
      return;
    }

    if (this.statusChart) {
      this.statusChart.destroy();
    }
    if (this.termChart) {
      this.termChart.destroy();
    }

    if (this.statusChartRef?.nativeElement) {
      const chartData = this.prepareChartData();
      this.statusChart = new Chart(this.statusChartRef.nativeElement, {
        type: 'pie',

        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: false,
              text: 'Loan Status Distribution'
            }
          }
        }
      });
    }

    // Create term chart (bar chart)
    if (this.termChartRef?.nativeElement) {
      const termCounts = this.countLoanTerms();
      this.termChart = new Chart(this.termChartRef.nativeElement, {
        type: 'line',  // Changed to line chart
        data: {
          labels: Object.keys(termCounts),
          datasets: [{
            label: 'Number of Loans',
            data: Object.values(termCounts),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',  // Required for line charts
            borderWidth: 2,  // Thicker line for better visibility
            tension: 0.1,  // Smooth curves (0 = straight lines)
            fill: false  // No area under the line
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: false,
              text: 'Loan Terms Distribution'
            }

          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Loan Terms'  // Switched axis labels
              }
            },
            y: {
              title: {
                display: true,
                text: 'Number of Loans'  // Switched axis labels
              },
              beginAtZero: true  // Start Y-axis at 0
            }
          }
        }
      });
    }

  }

  private prepareChartData(): any {
    const filteredLoans = this.getFilteredLoansForCharts();

    // Calculate averages
    const avgInterest = this.calculateAverage(filteredLoans, 'interestRate');
    const avgLoanAmount = this.calculateAverage(filteredLoans, 'loanAmount');
    const avgTerm = this.calculateAverage(filteredLoans, 'loanTerm');
    const avgApplicantIncome = this.calculateAverage(filteredLoans, 'applicantIncome');
    const avgCoapplicantIncome = this.calculateAverage(filteredLoans, 'coapplicantIncome');

    // Calculate totals
    const totalLoanAmount = filteredLoans.reduce((sum, loan) => sum + (loan.loanAmount || 0), 0);

    return {
      labels: ['Interest Rate', 'Loan Amount', 'Loan Term', 'Applicant Income', 'Co-applicant Income'],
      datasets: [
        {
          label: 'Average Values',
          data: [avgInterest, avgLoanAmount, avgTerm, avgApplicantIncome, avgCoapplicantIncome],
          backgroundColor: [
            '#74c9e3', // Light blue - Interest Rate
            '#005380',  // Dark blue - Loan Amount
            '#74c9e3',  // Lime green - Term
            '#028844',  // Green - Applicant Income
            '#bbd143'
          ],
          borderColor: 'white',
          borderWidth: 2
        },
        {
          label: 'Total Loan Amount',
          data: [null, totalLoanAmount, null, null, null], // Only show in Loan Amount column
          backgroundColor: '#74c9e3',
          borderColor: '#74c9e3',
          borderWidth: 1
        }
      ]
    };
  }

  private calculateAverage(loans: Loan[], property: string): number {
    if (loans.length === 0) return 0;
    const sum = loans.reduce((total, loan) => total + (loan[property as keyof Loan] as number || 0), 0);
    return sum / loans.length;
  }

  private countLoanStatuses(): { [key: string]: number } {
    const counts: { [key: string]: number } = {};
    const filteredLoans = this.getFilteredLoansForCharts();

    filteredLoans.forEach((loan: any) => {
      counts[loan.status] = (counts[loan.status] || 0) + 1;
    });
    return counts;
  }

  private countLoanTerms(): { [key: string]: number } {
    const counts: { [key: string]: number } = {};
    const filteredLoans = this.getFilteredLoansForCharts();

    filteredLoans.forEach((loan: any) => {
      counts[loan.loanTerm] = (counts[loan.loanTerm] || 0) + 1;
    });
    return counts;
  }

  private getFilteredLoansForCharts(): Loan[] {
    if (this.currentStatusFilter === 'ALL') {
      return this.loans;
    }
    return this.loans.filter(loan => loan.status === this.currentStatusFilter);
  }

  applyFilter(searchText: string): void {
    // Filter loans based on search text
    let filtered = this.loans.filter(loan => {
      // Safely handle optional properties
      const idMatch = loan.idLoan?.toString().includes(searchText) ?? false;
      const amountMatch = loan.loanAmount?.toString().includes(searchText) ?? false;
      const rateMatch = loan.interestRate?.toString().includes(searchText) ?? false;
      const termMatch = loan.loanTerm?.toString().includes(searchText) ?? false;
      const statusMatch = loan.status?.toLowerCase().includes(searchText.toLowerCase()) ?? false;

      return idMatch || amountMatch || rateMatch || termMatch || statusMatch;
    });

    // Sort the filtered loans
    filtered.sort((a: any, b: any) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];

      if (valA == null) return this.sortDirection === 'asc' ? 1 : -1;
      if (valB == null) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredLoans = filtered;
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilter("");
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage);
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }


  loadLoans(): void {
    this.loanService.getAllLoans().subscribe({
      next: (data) => {
        console.log(data)
        this.loans = data;
        this.chartDataReady = true;

        this.createCharts();
        this.applyFilter("");
      },
      error: (error) => {
        console.error('Error fetching loans:', error);
      }
    });
  }

  navigateToAddLoan(): void {
    this.router.navigate(['/loanmanagement/add']);
  }
  deleteLoan(id: number | undefined) {
    if (!id) {
      alert("Loan id not defined")
      return;
    }
    this.loanService.deleteLoan(id).subscribe(
      () => {
        alert("Deleted successfully")
        this.loadLoans();
      },
      (error) => {
        console.error(error)
      }
    )
  }

  viewLoan(id: number | undefined) {

    if (!id) return

    this.router.navigate(['/loanmanagement/view/' + id]);
  }
}
