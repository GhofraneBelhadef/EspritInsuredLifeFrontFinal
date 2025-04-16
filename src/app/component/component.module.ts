import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardsComponent } from './Client/ClaimManagement/complaint.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { RiskManagementComponent } from './Client/RiskManagement/RiskManagement.component';
import { NgbdDropdownBasicComponent } from './Client/DonationManagement/donation.component';

import { NgbdButtonsComponent } from './Client/ContractManagement/ContractManagement.component';

import { TableComponent } from "./Client/User/User.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RiskManagementComponent,
    CardsComponent,
    NgbdDropdownBasicComponent,
    NgbdButtonsComponent,
    TableComponent
  ],
})
export class ComponentsModule { }
