import { Component } from '@angular/core';
import { AutoLogoutService } from 'src/app/Services/User/auto-logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private autoLogoutService: AutoLogoutService) {
    // ✅ Ici, en injectant AutoLogoutService dans le constructeur,
    // ça va automatiquement écouter les mouvements de souris, clavier, etc.
  }
}
