import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

import { ContractManagementComponent } from './component/Client/ContractManagement/ContractManagement.component';
import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ContractAccountingListComponent } from './component/Admin/ContractsComponent/ContractAcountingComponent/contractaccounting-list';
import { ContractListComponent } from './component/Admin/ContractsComponent/ContractComponent/contract-list.component';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { ReportingComponent } from './component/Admin/ContractsComponent/reporting/reporting.component';
import { NgChartsModule } from 'ng2-charts';
import { ContractRequestComponent } from './component/Client/ContractManagement/contract-request/contract-request.component';
import { ContractDetailsComponent } from './component/Client/ContractManagement/contract-details/contract-details.component';

@NgModule({
  declarations: [
  
    ContractAccountingListComponent,
    AppComponent,
    SpinnerComponent,
    ReportingComponent,
    ContractManagementComponent,
    ContractRequestComponent,
    ContractDetailsComponent


 
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    ToastrModule.forRoot(),
 
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
