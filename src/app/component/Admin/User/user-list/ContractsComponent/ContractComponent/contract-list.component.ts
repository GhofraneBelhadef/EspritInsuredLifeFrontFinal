import { Component, OnInit } from '@angular/core';
import { ContractAdminService } from 'src/app/Services/User/ContractServices/ContractAdminService/contract-admin.service';
import { Contract } from 'src/app/models/ContractModel/contract.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {
  contractForm!: FormGroup;
  contracts: Contract[] = [];
  selectedContract: Contract | null = null;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private contractService: ContractAdminService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadContracts();
  }

  initializeForm(): void {
    this.contractForm = this.fb.group({
      insurrance_type: ['', Validators.required],
      insuredAge: [null, [Validators.required, Validators.min(10), Validators.max(100)]],
      category_contract: ['', Validators.required],
      Policy_inception_date: ['', Validators.required],
      expiration_date: ['', Validators.required],
      monthly_price: [null, [Validators.required, Validators.min(0.01)]],
      status: ['', Validators.required],
    });
  }

  loadContracts(): void {
    this.contractService.getAllContracts().subscribe({
      next: (data) => (this.contracts = data),
      error: () => (this.errorMessage = 'Failed to load contracts.')
    });
  }

  onSubmit(): void {
    const formValue = this.contractForm.value;
    const payload = {
      ...formValue,
      Policy_inception_date: new Date(formValue.Policy_inception_date).toISOString(),
      expiration_date: new Date(formValue.expiration_date).toISOString(),
      insuredAge: Number(formValue.insuredAge),
      monthly_price: parseFloat(formValue.monthly_price),
    };

    this.contractService.addContract(payload).subscribe({
      next: () => {
        this.resetForm();
        this.loadContracts();
      },
      error: () => (this.errorMessage = 'Failed to add contract.')
    });
  }

  editContract(contract: Contract): void {
    // Création d'une copie pour éviter la liaison directe
    this.selectedContract = { ...contract };
  }

  saveEdit(): void {
    if (!this.selectedContract) return;

    const payload = {
      ...this.selectedContract,
      policy_inception_date: new Date(this.selectedContract.Policy_inception_date).toISOString(),
      expiration_date: new Date(this.selectedContract.expiration_date).toISOString(),
    };
    this.contractService.updateContract(this.selectedContract.contract_id!, payload).subscribe({
      next: () => {
        this.loadContracts();
        this.closeModal();
      },
      error: () => (this.errorMessage = 'Failed to update contract.')
    });
  }

  deleteContract(id: number): void {
    this.contractService.deleteContract(id).subscribe({
      next: () => this.loadContracts(),
      error: () => (this.errorMessage = 'Failed to delete contract.')
    });
  }

  closeModal(): void {
    this.selectedContract = null;
  }

  resetForm(): void {
    this.contractForm.reset();
  }
}
