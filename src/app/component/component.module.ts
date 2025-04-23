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
import { LoginComponent } from './Client/User/login/login.component';
import { SignupComponent } from './Client/User/signup/signup.component';
import { ForgotpasswordComponent } from './Client/User/forgotpassword/forgotpassword.component';
import { QrLoginComponent } from './Client/User/qr-login/qr-login.component';
import { UserProfileComponent } from './Client/User/user-profile/user-profile.component';
import { OAuth2RedirectComponent } from './Client/User/oauth2-redirect/oauth2-redirect.component';
import { ResetpasswordComponent } from './Client/User/resetpassword/resetpassword.component';

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
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    QrLoginComponent,
    
    UserProfileComponent,
    OAuth2RedirectComponent,
    ResetpasswordComponent
  ],
})
export class ComponentsModule { }
