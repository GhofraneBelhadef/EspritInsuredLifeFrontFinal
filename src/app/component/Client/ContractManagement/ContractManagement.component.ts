import { ContractManagementService } from 'src/app/Services/ContractServices/contract-management.service';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-contract-management',
  templateUrl: './ContractManagement.component.html',
})
export class ContractManagementComponent implements OnInit {
  contracts: any[] = [];
  searchTerm: string = '';
  isLoading = false;
  successMessage: string = '';
  errorMessage: string = '';
  showDetailsMap: { [id: number]: boolean } = {};

  // PIE CHART: Insurance Type
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Life', 'Non-Life'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#28cb5f', '#035d61'],
      },
    ],
  };
  pieChartLabels: string[] = ['Life Insurance', 'Non-Life Insurance'];
  pieChartType: any = 'pie';

  // BAR CHART: Contract Status
  public statusChartData: ChartData<'bar', number[], string> = {
    labels: ['Active', 'Resilied', 'Expired'],
    datasets: [
      {
        label: 'Contracts',
        data: [0, 0, 0],
        backgroundColor: ['#28cb5f', '#e74c3c', '#7f8c8d'],
      },
    ],
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Contracts by Status',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Contracts',
        },
      },
    },
  };

  constructor(
    private contractService: ContractManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.isLoading = true;
    const userId = 1;
    this.contractService.getContractsByUserId(userId).subscribe(
      (data: any[]) => {
        this.contracts = data;
        this.updateChartData(data);
        this.updateStatusChartData(data); // ✅ Met à jour le bar chart
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load contracts.';
        this.isLoading = false;
        this.clearMessagesAfterDelay();
      }
    );
  }

  updateChartData(data: any[]): void {
    const lifeCount = data.filter(
      (c) => c.insurrance_type === 'Life_Insurance'
    ).length;
    const nonLifeCount = data.filter(
      (c) => c.insurrance_type === 'Non_lifeinsurance'
    ).length;

    this.pieChartData = {
      labels: ['Life', 'Non-Life'],
      datasets: [
        {
          data: [lifeCount, nonLifeCount],
          backgroundColor: ['#28cb5f', '#035d61'],
        },
      ],
    };
  }

  updateStatusChartData(data: any[]): void {
    const statuses = ['Active', 'Resilied', 'Expired'];
    const statusCount: { [key: string]: number } = {
      Active: 0,
      Resilied: 0,
      Expired: 0,
    };

    data.forEach((contract) => {
      const status = contract.status;
      if (statuses.includes(status)) {
        statusCount[status]++;
      }
    });

    this.statusChartData = {
      labels: statuses,
      datasets: [
        {
          label: 'Contracts',
          data: statuses.map((status) => statusCount[status]),
          backgroundColor: ['#28cb5f', '#e74c3c', '#7f8c8d'],
        },
      ],
    };
  }

  get filteredContracts(): any[] {
    if (!this.searchTerm.trim()) {
      return this.contracts;
    }
    const term = this.searchTerm.trim().toLowerCase();
    return this.contracts.filter((contract) =>
      contract.insurrance_type.toLowerCase().includes(term)
    );
  }

  cancelContract(id: number): void {
    this.contractService.cancelContract(id).subscribe(
      () => {
        this.successMessage = 'Contract canceled successfully.';
        this.loadContracts();
        this.clearMessagesAfterDelay();
      },
      () => {
        this.errorMessage = 'Error canceling contract.';
        this.clearMessagesAfterDelay();
      }
    );
  }

  navigateToRequest(type: string): void {
    this.router.navigate(['/request-contract'], {
      queryParams: { type },
    });
  }

  toggleDetails(id: number): void {
    this.showDetailsMap[id] = !this.showDetailsMap[id];
  }

  viewDetails(insuranceType: string): void {
    this.router.navigate(['/insurance-details'], {
      queryParams: { type: insuranceType },
    });
  }

  private clearMessagesAfterDelay(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
