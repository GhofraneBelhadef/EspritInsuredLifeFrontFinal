import { Routes } from '@angular/router';
import { RiskManagementComponent } from './Client/RiskManagement/RiskManagement.component';
import { CardsComponent } from './Client/ClaimManagement/complaint.component';
import { NgbdDropdownBasicComponent } from './Client/DonationManagement/donation.component';
import { BadgeComponent } from './Client/Loan Management/LoanManagement.component';
import { ContractManagementComponent } from './Client/ContractManagement/ContractManagement.component';
import { TableComponent } from './Client/User/User.component';
import {RiskAdminComponent} from './Admin/User/user-list/RiskManagement/RiskAdmin.Component'


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
				component: ContractManagementComponent
			}
		]
	}
];
