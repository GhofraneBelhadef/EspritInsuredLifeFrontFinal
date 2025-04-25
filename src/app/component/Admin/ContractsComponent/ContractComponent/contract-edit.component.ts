import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractAdminService } from 'src/app/Services/ContractServices/ContractAdminService/contract-admin.service';
import { Contract } from 'src/app/models/ContractModel/contract.model';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html'
})
export class ContractEditComponent implements OnInit {
  contractForm!: FormGroup;
  contractId!: number;
  contract!: Contract; // Créez la propriété contract

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractAdminService
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID du contrat depuis la route
    this.contractId = +this.route.snapshot.paramMap.get('id')!;

    // Récupération du contrat à partir du service
    this.contractService.getContractById(this.contractId).subscribe(contract => {
      this.contract = contract;

      // Initialisation du formulaire avec les valeurs du contrat
      this.contractForm = this.fb.group({
        contract_id: [this.contract.contract_id],  // Utilisation du bon nom de propriété
        insurrance_type: [this.contract.insurrance_type, Validators.required], // Corrigé à insurrance_type
        insuredAge: [this.contract.insuredAge, [Validators.required, Validators.min(10), Validators.max(100)]],
        category_contract: [this.contract.category_contract, Validators.required], // Corrigé à category_contract
        Policy_inception_date: [this.contract.Policy_inception_date, Validators.required], // Corrigé à Policy_inception_date
        expiration_date: [this.contract.expiration_date, Validators.required], // Corrigé à expiration_date
        monthly_price: [this.contract.monthly_price, [Validators.required, Validators.min(0.1)]],
        status: [this.contract.status, Validators.required], // Corrigé à status
      });
    });
  }

  onSubmit(): void {
    if (this.contractForm.valid) {
      // Vérifiez si contract_id existe avant de l'utiliser
      const contractId = this.contract.contract_id;
  
      if (contractId !== undefined) {
        // Appeler le service avec les deux arguments : l'ID et le contrat
        this.contractService.updateContract(contractId, this.contractForm.value).subscribe(() => {
          this.router.navigate(['/admin/contracts']);
        });
      } else {
        console.error('Le contrat n\'a pas d\'ID valide.');
      }
    }
  }}
