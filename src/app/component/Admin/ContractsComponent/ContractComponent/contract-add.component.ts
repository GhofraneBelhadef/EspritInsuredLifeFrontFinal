import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractAdminService } from 'src/app/Services/ContractServices/ContractAdminService/contract-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
})
export class ContractAddComponent implements OnInit {
  contractForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private contractService: ContractAdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contractForm = this.fb.group({
      insurrance_type: ['', Validators.required],
      insuredAge: [null, [Validators.required, Validators.min(10), Validators.max(100)]],
      category_contract: ['', Validators.required],
      policy_inception_date: ['', Validators.required],
      expiration_date: ['', Validators.required],
      monthly_price: [null, [Validators.required, Validators.min(0.01)]],
      status: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contractForm.valid) {
      const formValue = this.contractForm.value;

      const contractPayload = {
        ...formValue,
        // conversion en format ISO standard (attendu par Spring Boot avec Jackson)
        policy_inception_date: new Date(formValue.policy_inception_date).toISOString(),
        expiration_date: new Date(formValue.expiration_date).toISOString(),
        insuredAge: Number(formValue.insuredAge),
        monthly_price: parseFloat(formValue.monthly_price),
      };

      this.contractService.addContract(contractPayload).subscribe({
        next: () => this.router.navigate(['/admin/contracts']),
        error: (err) => {
          console.error('Erreur lors de l’ajout du contrat :', err);
          this.errorMessage = "Échec de l'ajout du contrat. Veuillez vérifier les données.";
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir correctement tous les champs requis.';
    }
  }
}
