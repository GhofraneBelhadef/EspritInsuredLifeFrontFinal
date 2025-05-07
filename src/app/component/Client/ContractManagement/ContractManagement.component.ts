import { ContractManagementService } from 'src/app/Services/User/ContractServices/contract-management.service';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/User/auth.service';
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
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.isLoading = true;
    const userId = this.authService.getUserId();
    
    // Check if userId is null or undefined
    if (userId === null || userId === undefined) {
      console.error('User ID is null or undefined - cannot load contracts');
      this.isLoading = false;
      this.errorMessage = 'User not authenticated. Please log in again.';
      this.clearMessagesAfterDelay();
      return;
    }
  
    console.log('Tentative de chargement pour user:', userId);
    console.log('Token actuel:', this.authService.getToken());
  
    this.contractService.getContractsByUserId(userId).subscribe({
      next: (data: any) => {
        console.log('Réponse API réussie:', data);
        this.contracts = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur détaillée:', {
          status: error.status,
          message: error.message,
          url: error.url,
          error: error.error
        });
        this.isLoading = false;
        this.errorMessage = 'Failed to load contracts. Please try again later.';
        this.clearMessagesAfterDelay();
      }
    });
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
      return this.contracts || []; // Retourne tous les contrats si pas de recherche
    }
    
    const term = this.searchTerm.trim().toLowerCase();
    return (this.contracts || []).filter((contract: any) => 
      contract.insurrance_type?.toLowerCase().includes(term) || 
      contract.category_contract?.toLowerCase().includes(term)
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
    // Ajoutez un log pour vérifier le token
    console.log('Token during navigation:', this.authService.getToken());
    
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
