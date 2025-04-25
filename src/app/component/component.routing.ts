import { Routes } from '@angular/router';
import { RiskManagementComponent } from './Client/RiskManagement/RiskManagement.component';
import { CardsComponent } from './Client/ClaimManagement/complaint.component';
import { NgbdDropdownBasicComponent } from './Client/DonationManagement/donation.component';
import { BadgeComponent } from './Client/Loan Management/LoanManagement.component';
import { NgbdButtonsComponent } from './Client/ContractManagement/ContractManagement.component';
import { TableComponent } from './Client/User/User.component';
import { ContractListComponent } from './Admin/ContractsComponent/ContractComponent/contract-list.component';
import { ContractAddComponent } from './Admin/ContractsComponent/ContractComponent/contract-add.component';
import { ContractEditComponent } from './Admin/ContractsComponent/ContractComponent/contract-edit.component';

export const ComponentsRoutes: Routes = [
	
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
			
			
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: RiskManagementComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			
			{ path: 'card',
			 component: CardsComponent },
			{
				path: 'buttons',
				component: NgbdButtonsComponent
			},
			{
				path: 'admin/contracts',
				children: [
				  { path: '', component: ContractListComponent },             // /admin/contracts
				  { path: 'add', component: ContractAddComponent },           // /admin/contracts/add
				  { path: '"edit/:id"', component: ContractEditComponent }      // /admin/contracts/edit/ID
				]
			  },
			  
		]
	}
];
