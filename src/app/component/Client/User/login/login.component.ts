import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/User/auth.service'; // Importer le service d'authentification

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginObj = {
    EmailId: '',
    Password: ''
  };
  passwordVisible: boolean = false; // Variable pour gérer la visibilité du mot de passe

  constructor(private authService: AuthService, private router: Router) {}

  // Fonction pour gérer l'affichage du mot de passe
  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Fonction pour soumettre le formulaire de login
  onLogin() {
    this.authService.login(this.loginObj.EmailId, this.loginObj.Password).subscribe(
      response => {
        console.log(response);
        if (response && response.token) {
          this.authService.saveToken(response.token); // Sauvegarde du token
  
          const role = this.authService.getUserRole(); // Récupération du rôle
          console.log('Rôle de l\'utilisateur :', role);
  
          if (role === 'ADMIN') {
            this.router.navigate(['/dashboardadmin']); // Redirection admin
          } else {
            this.router.navigate(['/dashboard']); // Redirection autres rôles
          }
  
        } else {
          alert('Erreur: Token non reçu');
        }
      },
      error => {
        console.error('Erreur lors de la connexion', error);
        alert('Email ou mot de passe incorrect');
      }
    );
  }
  ngOnInit(): void {
    const googleLoginBtn = document.querySelector('.google-btn');
    if (googleLoginBtn) {
      googleLoginBtn.addEventListener('click', () => {
        window.location.href = 'http://localhost:9090/oauth2/authorization/google';
      });
    }
  
  
}
isDarkMode: boolean = false; // Par défaut en mode clair

toggleDarkMode() {
  this.isDarkMode = !this.isDarkMode;

  if (this.isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

}
