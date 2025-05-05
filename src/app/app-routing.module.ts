import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/Client/User/login/login.component';
import { FullComponent } from './layouts/full/full.component';
import { SignupComponent } from './component/Client/User/signup/signup.component';
import { OAuth2RedirectComponent } from './component/Client/User/oauth2-redirect/oauth2-redirect.component';
import { ForgotpasswordComponent } from './component/Client/User/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './component/Client/User/resetpassword/resetpassword.component';
import { UserProfileComponent } from './component/Client/User/user-profile/user-profile.component';
import { QrLoginComponent } from './component/Client/User/qr-login/qr-login.component';
import { UserListComponent } from './component/Admin/User/user-list/user-list.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';  // layout pour admin
import { RiskAdminComponent } from './component/Admin/User/user-list/RiskManagement/RiskAdmin.Component';


export const Approutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'signup', component: SignupComponent },
  { path: 'qr-login', component: QrLoginComponent },
  {
    path: 'dashboardadmin',
    loadChildren: () =>
      import('./dashboardadmin/dashboardadmin.module').then(m => m.DashboardadminModule)
  },

  
  {
    path: '',
    component: FullComponent,
    children: [
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
        path: 'user-profile',
        component: UserProfileComponent
      },
      
      
      
    ]
    
    
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
     
      { path: 'admin/users', component: UserListComponent },
   { path: 'admin/RiskAdminComponent', component: RiskAdminComponent}
    ]
    
    
  },

  
  { path: 'oauth2/redirect', component: OAuth2RedirectComponent }, // <-- Cette ligne doit être avant le wildcard '**'
  { path: 'forgot-password', component: ForgotpasswordComponent },
  
  // Route pour réinitialisation du mot de passe
  { path: 'reset-password', component: ResetpasswordComponent },
  {
    path: '**',
    redirectTo: 'login'
  }
  
  
];
