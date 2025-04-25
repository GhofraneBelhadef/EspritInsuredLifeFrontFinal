import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractAdminService } from 'src/app/Services/ContractServices/ContractAdminService/contract-admin.service';
import { Contract } from 'src/app/models/ContractModel/contract.model';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html'
})
export class ContractListComponent implements OnInit {
  contracts: Contract[] = [];

  constructor(
    private contractService: ContractAdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.contractService.getAllContracts().subscribe(contracts => {
      console.log('Contrats reçus depuis le backend :', contracts);
      console.log('Nombre de contrats :', contracts.length);
      this.contracts = contracts;
    });
  }
  

  // Méthode editContract
  editContract(id: number): void {
    this.router.navigate(['/admin/contracts/edit', id]);
  }

  deleteContract(id: number): void {
    this.contractService.deleteContract(id).subscribe(() => {
      this.loadContracts(); // Recharge la liste après suppression
    });
  }
}
