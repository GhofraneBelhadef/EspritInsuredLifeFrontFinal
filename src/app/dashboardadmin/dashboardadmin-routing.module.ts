import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardadminComponent } from './dashboardadmin.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,   // ← ton layout admin
    children: [
      { path: '', component: DashboardadminComponent },
      // autres sous-routes admin…
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardadminRoutingModule {}
