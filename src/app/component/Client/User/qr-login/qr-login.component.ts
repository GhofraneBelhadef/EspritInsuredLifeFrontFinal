import { Component } from '@angular/core';
import { QrLoginService } from 'src/app/Services/User/qr-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-login',
  templateUrl: './qr-login.component.html',
  styleUrls: ['./qr-login.component.scss']
})
export class QrLoginComponent {
  username: string = '';
  qrCodeData: string | null = null;
  token: string = '';
  errorMessage = '';

  constructor(private qrLoginService: QrLoginService, private router: Router) {}

  generateQr(): void {
    if (!this.username) {
      this.errorMessage = 'Veuillez entrer un username.';
      return;
    }

    this.qrLoginService.generateQrCode(this.username).subscribe({
      next: (data) => {
        this.qrCodeData = data;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la génération du QR Code.';
      }
    });
  }

  validateToken(): void {
    if (!this.token) {
      this.errorMessage = 'Veuillez entrer un token.';
      return;
    }

    this.qrLoginService.validateQrCode(this.token).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'QR Code invalide ou expiré.';
      }
    });
  }
}
