import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { ContractListComponent } from './component/Admin/ContractsComponent/ContractComponent/contract-list.component';
import { ContractAddComponent } from './component/Admin/ContractsComponent/ContractComponent/contract-add.component';
import { ContractEditComponent } from './component/Admin/ContractsComponent/ContractComponent/contract-edit.component';
import { ContractAccountingListComponent } from './component/Admin/ContractsComponent/ContractAcountingComponent/contractaccounting-list';
import { ReportingComponent } from './component/Admin/ContractsComponent/reporting/reporting.component';

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
      }
    ]
  },

  {
    path: 'admin/contracts',
    children: [
      { path: '', component: ContractListComponent },
      { path: 'add', component: ContractAddComponent },
      { path: 'edit/:id', component: ContractEditComponent }
    ]
  },

  // ✅ Nouvelle route pour la liste des Contract Accounting
  {
    path: 'admin/contractAccounting',
    component: ContractAccountingListComponent
   
  },
  { path: 'admin/reporting', component: ReportingComponent },

  {
    path: '**',
    redirectTo: '/starter'
  }
];
