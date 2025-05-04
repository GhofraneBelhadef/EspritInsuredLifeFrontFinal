import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from 'src/app/Services/User/auth.service';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  user: any = null;
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];
  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  
    // Appel du backend pour récupérer le profil
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        console.log('Profil utilisateur:', this.user);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil:', err);
      }
    });
  }
}
