import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { CardsComponent } from './Client/ClaimManagement/complaint.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { RiskManagementComponent } from './Client/RiskManagement/RiskManagement.component';
import { NgbdDropdownBasicComponent } from './Client/DonationManagement/donation.component';
import { ContractManagementComponent } from './Client/ContractManagement/ContractManagement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from "./Client/User/User.component";
import { ContractListComponent } from './Admin/ContractsComponent/ContractComponent/contract-list.component';

import { ContractAccountingListComponent } from './Admin/ContractsComponent/ContractAcountingComponent/contractaccounting-list';

@NgModule({
 
  declarations: [
 
    ContractListComponent, 
    
    
  
   ],
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RiskManagementComponent,
    CardsComponent,
    NgbdDropdownBasicComponent,
   
    TableComponent
  ],
})
export class ComponentsModule { }
