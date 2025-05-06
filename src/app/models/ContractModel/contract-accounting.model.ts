export interface ContractAccounting {
    contract_accounting_id: number;
    matriculeFiscale: number;
    total_capital: number;
    indemnites_versees: number;
    created_at: string; // ou Date, selon ta préférence
    updated_at: string; // ou Date
    totalProvisions: number;
    contracts: any[]; // Tu peux définir un modèle pour Contract également si nécessaire
    provisionsTechniques: any[]; // Idem pour ProvisionsTechniques
  }