import { Routes } from '@angular/router';
import { RiskManagementComponent } from './Client/RiskManagement/RiskManagement.component';
import { CardsComponent } from './Client/ClaimManagement/complaint.component';
import { NgbdDropdownBasicComponent } from './Client/DonationManagement/donation.component';
import { BadgeComponent } from './Client/RiskAdmin/RiskAdmin.component';
import { NgbdButtonsComponent } from './Client/ContractManagement/ContractManagement.component';
import { TableComponent } from './Client/User/User.component';


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
			}
		]
	}
];
