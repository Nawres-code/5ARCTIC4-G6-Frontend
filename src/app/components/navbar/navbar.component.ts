import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { JwtDecodeService } from 'src/app/Service/JwtDecodeService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public decodedToken: any; // Declare decodedToken property
  public poste: any; // Declare poste property

  constructor(location: Location, private element: ElementRef, private router: Router, private jwtDecodeService: JwtDecodeService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    // This is used to get data from local storage
    // If you want to test for admin or not, use decodedToken.authorities[0]
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedToken = this.jwtDecodeService.decodeToken(); // Assign decoded token to decodedToken property
      console.log('Decoded token:', this.decodedToken);
    } else {
      console.log('Token not found in local storage');
    }

    // Call the getTitle() function to get the title when component initializes
    this.getTitle();
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
        titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
        if (this.listTitles[item].path === titlee) {
            // Set the poste property to the current listTitle object
            this.poste = this.listTitles[item];
            return this.poste.title;
        }
    }
    return "Default Title"; // Return a default title if no matching title found
  }

  logout() {
    // Clear token from application storage
    localStorage.removeItem('jwt_token');
    // Redirect to the login page or any other desired route
    this.router.navigate(['/login']);
  }
}
