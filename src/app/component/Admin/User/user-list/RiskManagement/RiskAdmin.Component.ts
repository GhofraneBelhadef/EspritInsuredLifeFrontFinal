import { Input, Component, OnInit } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RiskAssessmentService } from 'src/app/Services/User/RiskManagement/RiskManagement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-RiskAdminComponent',
  standalone: true,
  imports: [CommonModule, NgbAlertModule, NgFor, NgIf, FormsModule],
  templateUrl: 'RiskAdmin.component.html'
})
export class RiskAdminComponent implements OnInit {
  totalRiskAssessments: number = 0;
  averageRiskScore: number = 0;
  riskAssessments: any[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  hasNextPage: boolean = true;
  searchTerm: string = '';
  selectedUserId: number | null = null;
  riskHistory: any[] = [];
  showHistory: boolean = false;
  inputUserId: number | null = null;
  selectedAssessment: any = null; // Pour stocker le RiskAssessment sélectionné
  isModalOpen: boolean = false; 


  constructor(private riskService: RiskAssessmentService) {}
  viewRiskFactorHistory(userId: number): void {
    this.riskService.getRiskFactorHistory(userId).subscribe({
      next: (data) => {
        this.riskHistory = data;
        this.selectedUserId = userId;
        this.showHistory = true;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l’historique', err);
        this.riskHistory = [];
        this.showHistory = false;
      }
    });
  }
  
  closeHistory(): void {
    this.showHistory = false;
    this.selectedUserId = null;
    this.riskHistory = [];
  }
  
  loadRiskAssessments() {
    this.riskService.getAllRiskAssessmentsByPage(this.currentPage, this.pageSize).subscribe({
      next: response => {
        this.riskAssessments = response.content;
        this.hasNextPage = !response.last; // pour désactiver le bouton "Suivant" s'il n'y a plus de pages
      },
      error: err => {
        console.error('Erreur lors du chargement des données paginées', err);
      }
    });
  }
  
  nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.loadRiskAssessments();
    }
  }
  
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadRiskAssessments();
    }
  }
  onSearch() {
    if (this.searchTerm.trim()) {
      this.riskService.searchRiskAssessments(this.searchTerm).subscribe({
        next: data => {
          this.riskAssessments = data;
          this.hasNextPage = false; // Désactiver la pagination pendant la recherche
        },
        error: err => {
          console.error('Erreur lors de la recherche', err);
        }
      });
    } else {
      this.loadRiskAssessments(); // recharge les données normales si champ vide
    }
  }
  
  ngOnInit(): void {
    this.loadRiskAssessments();
    // Total Risk Assessments
    this.riskService.getTotalRiskAssessments().subscribe({
      next: data => {
        this.totalRiskAssessments = data.totalElements;
      },
      error: err => {
        console.error('Erreur lors du chargement des RiskAssessments', err);
      }
    });

    // Moyenne des RiskScores
    this.riskService.getAllRiskAssessments().subscribe({
      next: response => {
        const data = response.content; // Contenu de la page paginée
        if (data && data.length > 0) {
          const totalScore = data.reduce((sum: number, item: any) => sum + (item.riskScore || 0), 0);
          this.averageRiskScore = totalScore / data.length;
        } else {
          this.averageRiskScore = 0;
        }
      },
      error: err => {
        console.error('Erreur lors du calcul de la moyenne des RiskScores', err);
      }
    });
  }
}