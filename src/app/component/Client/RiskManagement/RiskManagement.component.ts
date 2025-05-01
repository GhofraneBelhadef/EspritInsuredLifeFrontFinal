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

  constructor(private riskAssessmentService: RiskAssessmentService) {}

  ngOnInit(): void {
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
