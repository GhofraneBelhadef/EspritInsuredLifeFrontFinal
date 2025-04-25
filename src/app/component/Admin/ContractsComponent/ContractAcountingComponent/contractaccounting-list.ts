import { Component, OnInit } from '@angular/core';
import { ContractAccountingService } from 'src/app/Services/ContractServices/ContractAdminService/contract-accounting.service';
import { ContractAccounting } from 'src/app/models/ContractModel/contract-accounting.model';

@Component({
  selector: 'app-contract-accounting-list',
  templateUrl: './contractaccounting-list.html',
})
export class ContractAccountingListComponent implements OnInit {
  contractAccountings: ContractAccounting[] = [];

  // Nouveau champ pour le formulaire
  newAccounting: ContractAccounting = {
    contract_accounting_id: 0,
    matriculeFiscale: 0,
    total_capital: 0,
    indemnites_versees: 0,
    totalProvisions: 0,
    created_at: new Date().toISOString(), // Convertir en chaîne ISO
    updated_at: new Date().toISOString(), // Convertir en chaîne ISO
    contracts: [],
    provisionsTechniques: []
  };

  constructor(private contractAccountingService: ContractAccountingService) {}

  ngOnInit(): void {
    this.loadAccountings();
  }

  loadAccountings(): void {
    this.contractAccountingService.getAllContractAccounting().subscribe(
      data => {
        // Convertir les dates en chaînes ISO au moment de la récupération des données
        this.contractAccountings = data.map(accounting => ({
          ...accounting,
          created_at: new Date(accounting.created_at).toISOString(),
          updated_at: new Date(accounting.updated_at).toISOString()
        }));
      },
      error => {
        console.error('Erreur lors de la récupération des comptes contractuels', error);
      }
    );
  }

  addAccounting(): void {
    // Vérifier que newAccounting est bien défini avant de l'envoyer
    if (this.newAccounting) {
      this.contractAccountingService.addContractAccounting(this.newAccounting).subscribe(
        (createdAccounting) => {
          console.log('Compte contractuel ajouté :', createdAccounting);
          this.contractAccountings.push(createdAccounting); // Ajouter l'élément créé à la liste
          this.resetForm(); // Réinitialiser le formulaire
        },
        error => {
          console.error('Erreur lors de l’ajout du compte contractuel', error);
        }
      );
    }
  }

  resetForm(): void {
    this.newAccounting = {
      contract_accounting_id: 0,
      matriculeFiscale: 0,
      total_capital: 0,
      indemnites_versees: 0,
      totalProvisions: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      contracts: [],
      provisionsTechniques: []
    };
  }

  editAccounting(accounting: ContractAccounting): void {
    console.log("Modification demandée pour :", accounting);
    // Redirection ou modal à implémenter
  }

  deleteAccounting(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      this.contractAccountingService.deleteContractAccounting(id).subscribe(() => {
        this.contractAccountings = this.contractAccountings.filter(a => a.contract_accounting_id !== id);
      }, error => {
        console.error('Erreur lors de la suppression', error);
      });
    }
  }

  // Mise à jour du capital avec matriculeFiscale et nouveau capital

  updateCapital(matriculeFiscale: number): void {
    // Appeler la méthode avec seulement matriculeFiscale
    this.contractAccountingService.updateTotalCapital(matriculeFiscale).subscribe(
      (updatedAccounting) => {
        console.log('Capital mis à jour', updatedAccounting);
        // Actions après mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du capital', error);
      }
    );
  }

  // Mise à jour des indemnités versées
  updateIndemnites(matriculeFiscale: number): void {
    if (matriculeFiscale) {
      this.contractAccountingService.updateIndemnites(matriculeFiscale).subscribe(
        (updatedAccounting) => {
          console.log('Indemnités mises à jour', updatedAccounting);
          // Actions après mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour des indemnités', error);
        }
      );
    }
  }

  // Calcul du bénéfice avec matriculeFiscale
  calculerBenefice(matriculeFiscale: number): void {
    if (matriculeFiscale) {
      this.contractAccountingService.calculerBenefice(matriculeFiscale).subscribe(
        (benefice) => {
          console.log('Bénéfice calculé :', benefice);
          // Actions après calcul
        },
        (error) => {
          console.error('Erreur lors du calcul du bénéfice', error);
        }
      );
    }
  }

  // Calcul du bénéfice total
  calculerBeneficeTotal(): void {
    this.contractAccountingService.getBeneficeTotal().subscribe(
      (totalBenefice) => {
        console.log('Bénéfice total calculé :', totalBenefice);
        // Actions après calcul du bénéfice total
      },
      (error) => {
        console.error('Erreur lors du calcul du bénéfice total', error);
      }
    );
  }
}
