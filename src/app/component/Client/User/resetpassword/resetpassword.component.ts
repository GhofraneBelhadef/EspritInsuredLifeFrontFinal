import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/User/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
})
export class ResetpasswordComponent {
  token: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Récupération du token depuis l'URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  onSubmit() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => this.message = 'Mot de passe réinitialisé avec succès !',
      error: (err) => {
        console.error(err);
        this.message = 'Mot de passe réinitialisé avec succès.';
      }
    });
  }
}
