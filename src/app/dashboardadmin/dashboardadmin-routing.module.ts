import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardadminComponent } from './dashboardadmin.component';
import { FullComponent } from '../layouts/full/full.component'; // ton layout global

const routes: Routes = [
  {
    path: '',
    component: FullComponent, // layout réutilisé
    children: [
      {
        path: '',
        component: DashboardadminComponent
      },
      // ajoute d'autres routes admin ici si nécessaire
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardadminRoutingModule {}
