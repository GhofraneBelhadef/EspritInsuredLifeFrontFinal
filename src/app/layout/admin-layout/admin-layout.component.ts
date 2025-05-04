import { CommonModule } from "@angular/common";
import { Component, OnInit, HostListener } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { NavigationComponent } from "src/app/shared/header/navigation.component";
import { SidebarAdminComponent } from "src/app/shared/sidebar-admin/sidebar-admin.component"; // Import SidebarAdminComponent

@Component({
  selector: "app-admin-layout", // Mettre un nom spécifique pour l'admin
  standalone: true,
  imports: [RouterModule, SidebarAdminComponent, NavigationComponent, CommonModule, NgbCollapseModule],
  templateUrl: "./admin-layout.component.html",  // Assurez-vous que ce template correspond au layout admin
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit { // Change le nom du composant pour `AdminLayoutComponent`

  constructor(public router: Router) {}
  
  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = "full";

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    // Vérifier si l'utilisateur est connecté en tant qu'administrateur et rediriger
    if (this.router.url === "/") {
      this.router.navigate(["/admin/dashboard"]); // Rediriger vers le tableau de bord admin
    }
    
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = "full";
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case "full":
        this.sidebartype = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.sidebartype = "full";
        break;

      default:
    }
  }
}
