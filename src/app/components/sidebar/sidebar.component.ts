import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtDecodeService } from 'src/app/Service/JwtDecodeService';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  subRoutes?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/getallsubscription', title: 'subscribe', icon: 'ni-paper-diploma text-dark', class: '' },
  { path: '/users', title: 'users', icon: 'ni-circle-08 text-pink', class: '' },
  { path: '/tables', title: 'Posts', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/comments', title: 'Comments', icon: 'ni-chat-round text-green', class: '' },
  { path: '/reclamationListUser', title: 'Reclamation', icon: 'ni-settings text-blue', class: '' }, //reclam user
  { path: '/reclamationAdmin', title: 'Reclamation Admin', icon: 'ni-settings text-blue', class: '' }, //reclam user
  { path: '/feedbackUser', title: 'Feedback', icon: 'ni-spaceship text-yellow', class: '' }, //reclam user
  { path: '/feedbackAdmin', title: 'Feedback Admin', icon: 'ni-spaceship text-yellow', class: '' }, //reclam user
  { path: '/subscriptionhistory', title: 'subscribtionHistory',  icon:'ni-paper-diploma text-dark', class: '' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public role: string;
  constructor(private router: Router, private jwtDecodeService: JwtDecodeService) { }

  ngOnInit() {
    // Get token from local storage
    const token = localStorage.getItem('jwt_token');

    // Check if token exists
    if (token) {
      // Decode token
      const decodedToken = this.jwtDecodeService.decodeToken();

      // Extract role from decoded token
      this.role = decodedToken.authorities[0];

      // Filter routes based on the role
      if (this.role === 'Admin') {
        this.menuItems = ROUTES.filter(menuItem => menuItem.path !== '/reclamationListUser' && menuItem.path !== '/feedbackUser');
      } else if (this.role === 'SubscriptionClient') {
        this.menuItems = ROUTES.filter(menuItem => menuItem.path !== '/user-profile' && menuItem.path !== '/getallsubscription' && menuItem.path !== '/users' && menuItem.path !== '/tables' && menuItem.path !== '/comments' && menuItem.path !== '/reclamationAdmin' && menuItem.path !== '/feedbackAdmin' );
      }
    } 

    // Subscribe to router events to collapse the sidebar when the route changes
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
    });
  }
}

// if (role === 'SubscriptionClient' && (state.url === '/user-profile' || state.url === '/tables' || state.url === '/users' || state.url === '/tables' || state.url === '/reclamationAdmin' || state.url === '/feedbackAdmin' ||  state.url === 'update-comment/:id' || state.url === 'comments' || state.url === 'add-comment/:id')) {
//   this.router.navigate(['/AccesDenied']);
//   return false;
// } else if (role === 'Admin' && (state.url === '/reclamationListUser' || state.url === '/reclamationUser' || state.url === '/feedbackUser')) {
//   this.router.navigate(['/AccesDenied']);