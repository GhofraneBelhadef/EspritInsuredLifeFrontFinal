import { Routes } from '@angular/router';
import { CustomerListComponent } from './Back/LoanManagement/customer-list/customer-list.component';
import { CustomerAddComponent } from './Back/LoanManagement/customer-add/customer-add.component';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: 'customers',
    component: FullComponent,
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
  },
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  }
];