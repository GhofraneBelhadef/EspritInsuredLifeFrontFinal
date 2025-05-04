import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { ContractListComponent } from './component/Admin/ContractsComponent/ContractComponent/contract-list.component';

import { ContractAccountingListComponent } from './component/Admin/ContractsComponent/ContractAcountingComponent/contractaccounting-list';
import { ReportingComponent } from './component/Admin/ContractsComponent/reporting/reporting.component';
import { ContractRequestComponent } from './component/Client/ContractManagement/contract-request/contract-request.component';
import { ContractDetailsComponent } from './component/Client/ContractManagement/contract-details/contract-details.component';
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
      { path: 'request-contract', component: ContractRequestComponent },
      { path: 'contract-details/:contractType', component: ContractDetailsComponent },
      
    ]

  },

  {
    path: 'admin/contracts',
    children: [
      { path: '', component: ContractListComponent },
    
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
