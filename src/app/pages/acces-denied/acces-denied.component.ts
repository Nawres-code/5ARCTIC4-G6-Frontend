import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acces-denied',
  templateUrl: './acces-denied.component.html',
  styleUrls: ['./acces-denied.component.scss']
})
export class AccesDeniedComponent {

  constructor(private router: Router) {}

  redirectToDashboard() {
    // Navigate to the dashboard route
    this.router.navigate(['/dashboard']).then(() => {
      // Reload the page after navigating to the dashboard
      window.location.reload();
    });
  }
}
