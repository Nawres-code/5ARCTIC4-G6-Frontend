import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtDecodeService } from './JwtDecodeService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtDecodeService: JwtDecodeService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if JWT token exists in local storage
    const token = localStorage.getItem('jwt_token');

    // Check if the requested route is login or register
    const isLoginOrRegister = state.url === '/login' || state.url === '/register';

    if (token) {
      // Decode token
      const decodedToken = this.jwtDecodeService.decodeToken();

      // Extract role from decoded token
      const role = decodedToken.authorities[0];

      if (isLoginOrRegister) {
        this.router.navigate(['/getallsubscription']); // Redirect to dashboard or any other desired route
        return false;
      }


      // this.router.navigate(['/AccesDenied']); // Redirect to error page for admin-specific routes
      //return false

      // Check if the user is trying to access admin-specific routes
      if (role === 'SubscriptionClient' && (state.url === '/user-profile' || state.url === '/getallsubscription' || state.url === '/tables' || state.url === '/users' || state.url === '/tables' || state.url === '/reclamationAdmin' || state.url === '/feedbackAdmin' ||  state.url === 'update-comment/:id' || state.url === 'comments' || state.url === 'add-comment/:id')) {
        this.router.navigate(['/AccesDenied']);
        return false;
      } else if (role === 'Admin' && (state.url === '/reclamationListUser' || state.url === '/reclamationUser' || state.url === '/feedbackUser')) {
        this.router.navigate(['/AccesDenied']);
        return false;
      } else {
        // Allow access for all other routes
        return true;
      }
    } else {
      // If token does not exist, allow access only to login and signup pages
      if (isLoginOrRegister) {
        return true;
      } else {
        this.router.navigate(['/dashboard']); // Redirect to login page if token does not exist
        return false;
      }
    }
  }
}


