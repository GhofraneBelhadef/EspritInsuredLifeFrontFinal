import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/User/auth.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;
  updatedUser: any = {};
  editMode: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Erreur récupération profil :', err);
      }
    });
  }

  editField(field: string) {
    this.editMode = field;
    this.updatedUser = { ...this.user }; // Clone l'objet user
  }

  saveUpdate() {
    const userId = this.user.id;
    this.authService.updateUser(userId, this.updatedUser).subscribe({
      next: (updated) => {
        this.user = updated;
        this.editMode = null;
        console.log('Utilisateur mis à jour avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour :', err);
      }
    });
  }

  deleteAccount() {
    this.authService.deleteAccount(this.user.id).subscribe({
      next: (message) => {
        console.log('Réponse:', message);
        alert('Compte supprimé');
        this.authService.logout(); // Déconnecter l'utilisateur
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur suppression compte :', err);
        alert('Suppression impossible');
      }
    });
  }
  selectedFile: File | null = null;

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}

uploadProfilePhoto() {
  if (!this.selectedFile) return;

  const formData = new FormData();
  formData.append('photo', this.selectedFile);

  this.authService.updatePhoto(this.user.id, formData).subscribe({
    next: (updatedUser) => {
      this.user = updatedUser; // mettre à jour l'affichage
      this.selectedFile = null;
    },
    error: (err) => {
      console.error('Erreur upload photo :', err);
    }
  });
}
}
