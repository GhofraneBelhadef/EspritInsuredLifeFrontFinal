import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/Services/User/ContractServices/ContractAdminService/reporting.service'
import { ChartOptions, ChartType, ChartData, ChartConfiguration } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom'; // zoom plugin bien importé
import { registerables, Chart } from 'chart.js'; // nécessaire pour enregistrer le plugin

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
})
export class ReportingComponent implements OnInit {
  public zoomPlugin = zoomPlugin; 
  pieChartLabels: string[] = [];
  pieChartData: ChartData<'pie', number[], string[]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#4CAF50', '#FF9800', '#03A9F4', '#E91E63', '#9C27B0'],
      hoverBackgroundColor: ['#66BB6A', '#FFB74D', '#4FC3F7', '#F06292', '#BA68C8'],
    }],
  };
  pieChartType: 'pie' = 'pie';
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'black',
          font: {
            size: 14,
          }
        }
      },
    },
  };

  totalContracts!: number;
  contractTypeDistribution!: { [key: string]: number };
  totalCapital!: number;
  totalProvisions!: number;
  averageSinistralite!: number;

  constructor(private reportingService: ReportingService) {
    // IMPORTANT : enregistrer les plugins nécessaires
    Chart.register(...registerables, zoomPlugin);
  }
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Nombre de contrats par niveau',
        data: [],
        backgroundColor: ['#2196F3', '#4CAF50', '#FFC107'], // couleurs pour chaque barre
        borderWidth: 1
      }
    ]
  };
  
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y', // Pour une barre horizontale
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: '📊 Répartition des contrats par niveau'
      }
    },
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

public barChartType: 'bar' = 'bar';
  ngOnInit(): void {
    this.reportingService.getTotalContracts().subscribe(data => this.totalContracts = data);
    this.reportingService.getContractTypeDistribution().subscribe(data => {
      this.contractTypeDistribution = data;
      this.pieChartLabels = Object.keys(data);
      this.pieChartData.datasets[0].data = Object.values(data);
    });
    this.reportingService.getTotalCapital().subscribe(data => this.totalCapital = data);
    this.reportingService.getTotalProvisions().subscribe(data => this.totalProvisions = data);
    this.reportingService.getAverageSinistralite().subscribe(data => this.averageSinistralite = data);

  }

  downloadReport(): void {
    this.reportingService.downloadExcelReport().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  // 🎯 GRAPHIQUE LINE CHART
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Contrats actifs', 'Capital Total', 'Provisions', 'Sinistralité'],
    datasets: [
      {
        data: [120, 600000, 25000, 4.5], // Données 2024
        label: 'Données 2024',
        fill: true,
        tension: 0.4,
        borderColor: '#4e73df',
        backgroundColor: 'rgba(78, 115, 223, 0.2)',
        pointBackgroundColor: '#4e73df',
        pointBorderColor: '#4e73df',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4e73df'
      },
      {
        data: [140, 650000, 28000, 3.8], // Données 2025
        label: 'Données 2025',
        fill: true,
        tension: 0.4,
        borderColor: '#1cc88a',
        backgroundColor: 'rgba(28, 200, 138, 0.2)',
        pointBackgroundColor: '#1cc88a',
        pointBorderColor: '#1cc88a',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1cc88a'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '📈 Évolution Comparée Assurance 2024 - 2025'
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x', // mouvement horizontal
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x', // zoom horizontal uniquement
        },
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutQuart',
        from: 0.2,
        to: 0.4,
        loop: true
      }
    }
  };

  public lineChartType: 'line' = 'line';
}
