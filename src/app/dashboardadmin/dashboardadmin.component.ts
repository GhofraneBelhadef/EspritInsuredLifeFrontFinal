import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardadmin',
  templateUrl: './dashboardadmin.component.html',
  styleUrls: ['./dashboardadmin.component.scss']
})
export class DashboardadminComponent {
  constructor(private router: Router) {}

goToUsers() {
  this.router.navigate(['/admin/users']);
}


}
