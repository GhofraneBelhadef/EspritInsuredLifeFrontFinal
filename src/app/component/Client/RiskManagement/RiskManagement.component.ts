import { Input, Component, OnInit } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RiskAssessmentService } from '../../../services/RiskAssessment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngbd-alert',
  standalone: true,
  imports: [CommonModule, NgbAlertModule, NgFor, NgIf, FormsModule],
  templateUrl: 'RiskManagement.component.html'
})
export class RiskManagementComponent implements OnInit {
  @Input() public alerts: Array<IAlert> = [];
  riskAssessmentId: number = 0;
  riskAssessment: any = null;
  userId: number = 0;
  errorMessage: string = '';
  public riskFactorIds: number[] = [];
  public userWhatsapp: string = '';
  medicalRecordFile: File | null = null;
  public riskFactorIdsInput: string = '';
  public riskFactorHistory: any[] = [];
  showHistory: boolean = false;
  riskAssessments: any[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  hasNextPage: boolean = true;

  constructor(private riskAssessmentService: RiskAssessmentService) {}
  loadRiskAssessments() {
    this.riskAssessmentService.getAllRiskAssessmentsByPage(this.currentPage, this.pageSize).subscribe({
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
  ngOnInit(): void {
    this.loadRiskAssessments();
    this.alerts.push(
      { id: 1, type: 'primary', message: 'This is a primary alert' },
      { id: 2, type: 'info', message: 'This is an info alert' },
      { id: 3, type: 'success', message: 'This is a success alert' },
      { id: 4, type: 'warning', message: 'This is a warning alert' },
      { id: 5, type: 'danger', message: 'This is a danger alert' },
      { id: 6, type: 'secondary', message: 'This is a secondary alert' }
    );
  }

  onFileSelected(event: any): void {
    this.medicalRecordFile = event.target.files[0] ?? null;
  }

  parseRiskFactorIds(): void {
    this.riskFactorIds = this.riskFactorIdsInput
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));
  }
  getColor(score: number): string {
    if (score < 40) return '#28a745';      // Vert
    if (score < 60) return '#ffc107';      // Jaune
    if (score < 75) return '#fd7e14';      // Orange
    return '#dc3545';                      // Rouge
  }
  
  onSubmit(): void {
    if (this.userId) {
      this.parseRiskFactorIds();
      const fileToSend = this.medicalRecordFile ?? undefined;

      this.riskAssessmentService.createRiskAssessment(
        this.userId,
        fileToSend as File,
        this.riskFactorIds,
        this.userWhatsapp || ''
      ).subscribe({
        next: (response) => {
          console.log('RiskAssessment créé avec succès', response);
          this.alerts.push({
            id: Date.now(),
            type: 'success',
            message: 'Le Risk Assessment a été créé avec succès.',
          });
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi', error);
          this.alerts.push({
            id: Date.now(),
            type: 'danger',
            message: 'Une erreur est survenue lors de la création du Risk Assessment.',
          });
        }
      });
    } else {
      this.alerts.push({
        id: Date.now(),
        type: 'warning',
        message: 'Veuillez renseigner tous les champs obligatoires (User ID requis).',
      });
    }
  }

  onSearch(): void {
    if (this.userId > 0) {
      this.riskAssessmentService.getRiskFactorHistory(this.userId).subscribe({
        next: (historyData) => {
          this.riskFactorHistory = historyData;
          this.showHistory = true;
          console.log('Historique du risque :', this.riskFactorHistory);
        },
        error: (error) => {
          console.error('Erreur lors du chargement de l\'historique des facteurs de risque', error);
        }
      });      
      this.riskAssessmentService.getRiskAssessmentById(this.userId).subscribe({
        next: (data) => {
          this.riskAssessment = data;

          // ✅ Convertir chronicDisease string → array
          if (this.riskAssessment?.chronicDisease) {
            this.riskAssessment.chronicDiseaseArray = this.riskAssessment.chronicDisease
              .split(',')
              .map((d: string) => d.trim());
          } else {
            this.riskAssessment.chronicDiseaseArray = [];
          }

          this.errorMessage = '';
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Erreur lors de la récupération des données.';
          this.riskAssessment = null;
        }
      });
    } else {
      this.errorMessage = 'Veuillez entrer un ID valide.';
      this.riskAssessment = null;
    }
  }
}

// Interface des alertes
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
