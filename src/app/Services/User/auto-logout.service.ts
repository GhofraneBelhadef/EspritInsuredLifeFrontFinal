import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  timeoutInMs: number = 5 * 60 * 1000; // 15 minutes
  warningTimeInMs: number = 1 * 60 * 1000; // 1 minute avant logout
  timeout: any;
  warningTimeout: any;
  countdownInterval: any;
  countdown: number = 60; // secondes du compte à rebours

  constructor(private router: Router, private ngZone: NgZone) {
    this.initListener();
    this.resetTimeout();
  }

  initListener() {
    window.addEventListener('mousemove', () => this.resetTimeout());
    window.addEventListener('keydown', () => this.resetTimeout());
    window.addEventListener('click', () => this.resetTimeout());
  }

  resetTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.warningTimeout) {
      clearTimeout(this.warningTimeout);
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    // Timer principal pour la déconnexion
    this.timeout = setTimeout(() => this.handleLogout(), this.timeoutInMs);

    // Timer pour afficher l'avertissement
    this.warningTimeout = setTimeout(() => this.startWarning(), this.timeoutInMs - this.warningTimeInMs);
  }

  startWarning() {
    this.countdown = 60; // 60 secondes
    alert('Inactivité détectée. Vous serez déconnecté dans 60 secondes.');

    this.countdownInterval = setInterval(() => {
      this.countdown--;
      console.log(`Déconnexion dans ${this.countdown} secondes.`);

      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    alert('Déconnecté automatiquement pour cause d\'inactivité.');
  }
}
