import { Component, OnInit } from '@angular/core';
import { ContractAccountingService } from 'src/app/Services/ContractServices/ContractAdminService/contract-accounting.service';
import { ContractAccounting } from 'src/app/models/ContractModel/contract-accounting.model';

@Component({
  selector: 'app-contract-accounting-list',
  templateUrl: './contractaccounting-list.html',
  styleUrls: ['./contractaccounting-list.scss']
})
export class ContractAccountingListComponent implements OnInit {
  contractAccountings: ContractAccounting[] = [];
  selectedAccounting: ContractAccounting | null = null;

  newAccounting: ContractAccounting = {
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

  constructor(private contractAccountingService: ContractAccountingService) {}

  ngOnInit(): void {
    this.loadAccountings();
  }

  loadAccountings(): void {
    this.contractAccountingService.getAllContractAccounting().subscribe(
      data => {
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
    if (this.newAccounting) {
      this.contractAccountingService.addContractAccounting(this.newAccounting).subscribe(
        (createdAccounting) => {
          console.log('Compte contractuel ajouté :', createdAccounting);
          this.contractAccountings.push(createdAccounting);
          this.resetForm();
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
    // Cloner l'objet pour éviter l'édition directe
    this.selectedAccounting = { ...accounting };
  }

  closeModal(): void {
    this.selectedAccounting = null;
  }

  saveEdit(): void {
    if (this.selectedAccounting) {
      // Vérification si l'ID existe
      const id = this.selectedAccounting.contract_accounting_id;
      if (id) {
        // Appel à la méthode updateContractAccounting avec l'ID et les données
        this.contractAccountingService.updateAccounting(id, this.selectedAccounting).subscribe({
          next: (updated) => {
            console.log('Mise à jour réussie :', updated);
            this.loadAccountings();  // Recharge les données après mise à jour
            this.closeModal();       // Ferme la fenêtre modale
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour', error);
          }
        });
      } else {
        console.error('Erreur: ID manquant pour la mise à jour');
      }
    }
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

  updateCapital(matriculeFiscale: number): void {
    this.contractAccountingService.updateTotalCapital(matriculeFiscale).subscribe(
      (updatedAccounting) => {
        console.log('Capital mis à jour', updatedAccounting);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du capital', error);
      }
    );
  }

  updateIndemnites(matriculeFiscale: number): void {
    if (matriculeFiscale) {
      this.contractAccountingService.updateIndemnites(matriculeFiscale).subscribe(
        (updatedAccounting) => {
          console.log('Indemnités mises à jour', updatedAccounting);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour des indemnités', error);
        }
      );
    }
  }

  calculerBenefice(matriculeFiscale: number): void {
    if (matriculeFiscale) {
      this.contractAccountingService.calculerBenefice(matriculeFiscale).subscribe(
        (benefice) => {
          console.log('Bénéfice calculé :', benefice);
        },
        (error) => {
          console.error('Erreur lors du calcul du bénéfice', error);
        }
      );
    }
  }

  calculerBeneficeTotal(): void {
    this.contractAccountingService.getBeneficeTotal().subscribe(
      (totalBenefice) => {
        console.log('Bénéfice total calculé :', totalBenefice);
      },
      (error) => {
        console.error('Erreur lors du calcul du bénéfice total', error);
      }
    );
  }
}
