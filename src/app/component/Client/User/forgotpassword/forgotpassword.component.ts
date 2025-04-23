import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/User/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
})
export class ForgotpasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.message = 'Lien de réinitialisation envoyé ! Vérifiez votre email.';
      },
      error: (err) => {
        console.error(err);
        this.message = 'Une erreur est survenue. Vérifiez l\'adresse email.';
      }
    });
  }
}
