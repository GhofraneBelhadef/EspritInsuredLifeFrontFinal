import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/User/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  page = 0;  // Page courante
  size = 10;  // Nombre d'utilisateurs par page
  totalUsers: number = 0;  // Total des utilisateurs
  totalPages: number = 0;  // Total des pages

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Récupère les utilisateurs et met à jour les informations de pagination
  fetchUsers() {
    this.authService.getAllUsers(this.page, this.size).subscribe(res => {
      this.users = res.content;
      this.totalUsers = res.totalElements; // Total des utilisateurs dans la base
      this.totalPages = res.totalPages;  // Total des pages (pour la pagination)
    });
  }

  // Méthode pour passer à la page suivante
  goToNextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.fetchUsers();  // Récupère les utilisateurs de la nouvelle page
    }
  }

  // Méthode pour revenir à la page précédente
  goToPreviousPage() {
    if (this.page > 0) {
      this.page--;
      this.fetchUsers();  // Récupère les utilisateurs de la page précédente
    }
  }
  deleteUser(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      this.authService.deleteAccount(id).subscribe({
        next: () => {
          // Recharger les utilisateurs après suppression
          this.fetchUsers();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression :", err);
        }
      });
    }
  }
  
}
