import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Déclaration d'un type pour les données des contrats
export interface ContractData {  // Ajoute `export` ici
  description: string;
  details: {
    category: string;
    info: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ContractDetailsService {

  // Déclare l'objet contractData avec un type précis
  private contractData: { [key: string]: ContractData } = {
    'Life_Insurance': {
      description: 'Life insurance provides financial protection for your loved ones in case of unexpected events.',
      details: [
        { category: 'Business', info: 'For business owners, life insurance can cover the business and its stakeholders.' },
        { category: 'Worker', info: 'Employees may benefit from life insurance as a workplace benefit.' },
        { category: 'Employee', info: 'Individual employees may receive life insurance as part of a benefits package.' }
      ]
    },
    'Non_Life_Insurance': {
      description: 'Non-life insurance covers risks like health, property, and automobiles.',
      details: [
        { category: 'Business', info: 'Business insurance provides coverage for your company\'s assets and employees.' },
        { category: 'Worker', info: 'Workers may be covered for health, accidents, and injuries in the workplace.' },
        { category: 'Employee', info: 'Employees may receive health insurance or coverage for accidents through their employer.' }
      ]
    }
  };

  constructor() { }

  getContractDetails(contractType: string): Observable<ContractData> {
    return of(this.contractData[contractType]);
  }

}
