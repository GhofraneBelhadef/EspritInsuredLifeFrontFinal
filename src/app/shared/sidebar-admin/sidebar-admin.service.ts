// src/app/shared/sidebar-admin/sidebar-admin.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouteInfo } from './sidebar-admin.metadata';
import { ROUTES_ADMIN } from './menu-items-admin'; // Routes spécifiques à l'admin

@Injectable({
  providedIn: 'root'
})
export class SidebarAdminService {

  public screenWidth: any;
  public collapseSidebar: boolean = false;
  public fullScreen: boolean = false;

  MENUITEMS: RouteInfo[] = ROUTES_ADMIN; // Utiliser les routes de l'admin

  items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);

  constructor() {
    // Tu peux éventuellement ajouter d'autres logiques spécifiques à l'admin ici.
  }
}
