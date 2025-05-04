import { Component, OnInit } from '@angular/core';
import { ROUTES_ADMIN } from './menu-items-admin'; // ⚠️ nouveau fichier avec routes spécifiques admin
import { RouteInfo } from '../sidebar/sidebar.metadata'; // tu peux réutiliser le même type
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from 'src/app/Services/User/auth.service';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar-admin.component.html',
})
export class SidebarAdminComponent implements OnInit {
  user: any = null;
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[] = [];

  addExpandClass(element: string) {
    this.showMenu = this.showMenu === element ? '0' : element;
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.sidebarnavItems = ROUTES_ADMIN.filter(item => item);

    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        console.log('Profil admin:', this.user);
      },
      error: (err) => {
        console.error('Erreur chargement profil admin:', err);
      }
    });
  }
}
