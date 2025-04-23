import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oauth2-redirect',
  template: `<p>Connexion en cours...</p>`
})
export class OAuth2RedirectComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:9090/api/auth/success', { withCredentials: true })
      .subscribe({
        next: (res) => {
          if (res.token) {
            // Si le token existe, on le stocke dans localStorage
            localStorage.setItem('token', res.token);
            console.log('Token reçu et stocké:', res.token);
            // Redirection vers le dashboard
            this.router.navigate(['/dashboard']);
          } else {
            console.log('Pas de token trouvé, redirection vers le dashboard');
            // Si aucun token n'est trouvé, on redirige directement vers le dashboard
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.error('Erreur après connexion Google', err);
          // En cas d'erreur, on redirige également vers le dashboard
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
