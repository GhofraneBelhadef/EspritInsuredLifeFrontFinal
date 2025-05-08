import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';

export const ComponentsRoutes: Routes = [
	{
		path: 'customers',
		children: [
			{
				path: '',
				component: CustomerListComponent
			},
			{
				path: 'add',
				component: CustomerAddComponent
			}
		]
	}
];
