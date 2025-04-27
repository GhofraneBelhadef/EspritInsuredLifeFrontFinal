import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/User/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  page = 0;
  size = 10;
  totalUsers: number = 0;
  totalPages: number = 0;
  searchTerm: string = ''; // 🔥 Nouveau : le terme recherché

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    if (this.searchTerm.trim()) {
      // Si recherche, appeler searchUsers
      this.authService.searchUsers(this.searchTerm, this.page, this.size).subscribe(res => {
        this.users = res.content;
        this.totalUsers = res.totalElements;
        this.totalPages = res.totalPages;
      });
    } else {
      // Sinon, charger normalement tous les users
      this.authService.getAllUsers(this.page, this.size).subscribe(res => {
        this.users = res.content;
        this.totalUsers = res.totalElements;
        this.totalPages = res.totalPages;
      });
    }
  }

  goToNextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.fetchUsers();
    }
  }

  goToPreviousPage() {
    if (this.page > 0) {
      this.page--;
      this.fetchUsers();
    }
  }

  deleteUser(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      this.authService.deleteAccount(id).subscribe({
        next: () => {
          this.fetchUsers();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression :", err);
        }
      });
    }
  }

  // 🔥 Appelée quand on tape dans la barre de recherche
  onSearch() {
    this.page = 0; // toujours revenir page 0 si on fait une recherche
    this.fetchUsers();
  }
}
