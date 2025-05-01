import { Component, OnInit } from '@angular/core';
import { RiskAssessmentService } from './services/RiskAssessment.service'; // Bien importé
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  greeting: string = ''; // Message de succès
  userId: number = 0; // ID de l'utilisateur
  medicalRecord: File | null = null; // Fichier PDF médical
  errorMessage: string = ''; // Message d'erreur
  riskFactorIds: number[] = []; // Liste des IDs de facteurs de risque
  userWhatsapp: string = ''; // Numéro WhatsApp facultatif
  
  constructor(private riskAssessmentService: RiskAssessmentService) {} // Injection du service

  ngOnInit(): void {
    // Init si besoin
  }

  // Gérer le choix du fichier médical
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.medicalRecord = file;
    }
  }

  // Fonction pour transformer les IDs des facteurs de risque en tableau d'entiers
  parseRiskFactorIds(riskFactorIdsInput: string): number[] {
    return riskFactorIdsInput
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));
  }

  // Soumettre le formulaire
  submitRiskAssessment(riskFactorIdsInput: string): void {
    if (this.userId && this.medicalRecord) { // Ajout vérification fichier médical
      // Transforme la chaîne en tableau d'IDs
      const riskFactorIds = this.parseRiskFactorIds(riskFactorIdsInput);
      const fileToSend = this.medicalRecord ?? undefined;

      this.riskAssessmentService.createRiskAssessment(
        this.userId,
        fileToSend as File,
        riskFactorIds,
        this.userWhatsapp
      ).subscribe(
        (response) => {
          console.log('Évaluation des risques créée avec succès:', response);
          this.greeting = 'Évaluation des risques soumise avec succès !';
          this.errorMessage = '';
        },
        (error) => {
          console.error('Erreur:', error);
          this.errorMessage = 'Erreur lors de la soumission: ' + (error.message || 'Serveur inaccessible.');
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
    }
  }  
}
