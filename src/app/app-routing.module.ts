import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { CustomerListComponent } from './Back/CustomerManagement/customer-list/customer-list.component';
import { CustomerAddComponent } from './Back/CustomerManagement/customer-add/customer-add.component';
import { AddLoanManagementComponent } from './Back/CustomerManagement/add-loan-management/add-loan-management.component';
import { ListBackLoanManagementComponent } from './Back/LoanManagement/list-back-loan-management/list-back-loan-management.component';
import { ViewLoanComponent } from './Back/LoanManagement/view-loan/view-loan.component';
import { FrontPageComponent } from './Front/LoanManagement/front-page/front-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'loanmanagement',
        loadChildren: () => import('./Back/LoanManagement/component.module').then(m => m.ComponentsLoanManagementModule)
      },
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
      },
      {
        path: 'front',
        children: [
          {
            path: '',
            component: FrontPageComponent
          },
        ]
      },

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(Approutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
