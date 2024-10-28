import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showNavbar: boolean = true;
  showSidebar: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Determine which components to show based on the current route
        const currentRoute = event.urlAfterRedirects;
        if ((currentRoute === '/login') || (currentRoute === '/register') ||  (currentRoute ==='/forget-pwd') || (currentRoute === '/reset-password') || (currentRoute === '/error') || (currentRoute==='/AccesDenied')) {
          this.showNavbar = false;
          this.showFooter = false;
          this.showSidebar = false;
        } else {
          this.showNavbar = true;
          this.showFooter = true;
          this.showSidebar = true;
        }
      }
    });
  }
}
