import { Routes } from '@angular/router';
import { ListBackLoanManagementComponent } from './list-back-loan-management/list-back-loan-management.component';
import { AddLoanManagementComponent } from '../CustomerManagement/add-loan-management/add-loan-management.component';
import { ViewLoanComponent } from './view-loan/view-loan.component';

export const ComponentsRoutes: Routes = [
	{
        path: '',
        children: [
          {
            path: '',
            component: ListBackLoanManagementComponent
          },
          {
            path: 'add',
            component: AddLoanManagementComponent
          },
          {
            path: 'view/:id', 
            component: ViewLoanComponent
          }
        ]
      }
];
